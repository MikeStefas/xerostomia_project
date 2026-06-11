import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma-service';
import { Role } from 'src/enums/role-enum';
import { ConfigService } from '@nestjs/config';
import { createClient, WebDAVClient } from 'webdav';
import microserviceLLMCall, { cleanupFiles, getReports, uploadImages } from './actions';

import { DoesXExist } from 'src/methods/does-x-exist';

@Injectable()
export class ReportsService {
  private webdavClient: WebDAVClient;

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private doesXExist: DoesXExist,
  ) {
    this.webdavClient = createClient(
      this.config.get('NEXTCLOUD_URL')!,
      {
        username: this.config.get('NEXTCLOUD_USERNAME')!,
        password: this.config.get('NEXTCLOUD_PASSWORD')!,
      },
    );
  }

  async viewUserReports(
    requesterID: number,
    requesterRole: Role,
    body: { userID: number },
  ) {
    try {
      const targetUserID = body.userID;

      if (requesterRole === Role.ADMIN) {
        return getReports(this.prisma, targetUserID);
      }

      if (requesterRole === Role.PATIENT) {
        return getReports(this.prisma, requesterID);
      }

      if (requesterRole === Role.CLINICIAN) {
        const isPaired = await  this.doesXExist.doesPairExist(requesterID, targetUserID);

        if (!isPaired) {
          throw new ForbiddenException(
            'Unauthorized to view reports of this userID',
          );
        }

        return getReports(this.prisma, targetUserID);
      }

      throw new ForbiddenException('Unauthorized role');
    } catch (error) {
      if (error instanceof ForbiddenException) throw error;
      throw new InternalServerErrorException(`${error}`);
    }
  }

  async generateReport(
    requesterID: number,
    requesterRole: Role,
    files?: Express.Multer.File[],
  ) {
    if (files?.length != 4) throw new BadRequestException("Please upload 4 images");

    if (requesterRole !== Role.PATIENT) {
      throw new ForbiddenException('Unauthorized role');
    }

    try {
      //send request to the fastapi to run the model
      const llm_res = await microserviceLLMCall(this.config, files);

      if (!llm_res || llm_res.message) {
        throw new InternalServerErrorException(llm_res?.message || `LLM Connection Error`);
      }

      //make the report
      const prisma_res = await this.prisma.report.create({
        data: {
          userID: requesterID,
          file1: llm_res[0].image,
          file2: llm_res[1].image,
          file3: llm_res[2].image,
          file4: llm_res[3].image,
          result1: llm_res[0].prob_yes,
          result2: llm_res[1].prob_yes,
          result3: llm_res[2].prob_yes,
          result4: llm_res[3].prob_yes,
          result_total: (llm_res[0].prob_yes + llm_res[1].prob_yes + llm_res[2].prob_yes + llm_res[3].prob_yes )/4,
        },
      });

      //add file to the database     
      const uploadResult = await uploadImages(this.webdavClient, files, requesterID, prisma_res.reportId);
      cleanupFiles(files);
      
      return { ...prisma_res, uploadResult };
    } catch (error) {
      cleanupFiles(files);
      if (error instanceof ForbiddenException || error instanceof BadRequestException || error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException(`${error}`);
    }

  }


  



  async getImages(requesterID: number, reportID: number, userID: number, requesterRole: Role) {

    if (requesterRole === Role.PATIENT) {
      throw new ForbiddenException('Unauthorized');
    }

    if (requesterRole === Role.CLINICIAN) {
      const isPaired = await this.doesXExist.doesPairExist(requesterID, userID);

      if (!isPaired) {
        throw new ForbiddenException(
          'Unauthorized to view reports of this userID',
        );
      }
    }
    try {
      const remoteDir = `/participant-${userID}/report-${reportID}`;

      const exists = await this.webdavClient.exists(remoteDir);
      if (!exists) {
        return {message: 'No images found'};
      }

      const contents = await this.webdavClient.getDirectoryContents(remoteDir);
      const files = Array.isArray(contents) ? contents : (contents as any).data;

      const imageBuffers = await Promise.all(
        files.map(async (file) => {
          const content = await this.webdavClient.getFileContents(file.filename);
          return Array.isArray(content) || typeof content === 'string' || Buffer.isBuffer(content) 
            ? content 
            : (content as any).data;
        })
      );

      return imageBuffers;
    } catch (error) {
      throw new InternalServerErrorException(`Error fetching images: ${error}`);
    }
  }


}