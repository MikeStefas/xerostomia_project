import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ReportsService } from './reports-service';
import { JwtGuard } from 'guard';
import { BasicUserInfo } from 'src/auth/auth-dto';
import { Role } from 'src/enums/role-enum';
import {  FilesInterceptor } from '@nestjs/platform-express';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('view-user-reports/:userID')
  @UseGuards(JwtGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  viewUserReports(
    @Request() req: BasicUserInfo,
    @Param('userID', ParseIntPipe) userID: number,
  ) {
    return this.reportsService.viewUserReports(
      req.user.userID,
      req.user.role as Role,
      { userID },
    );
  }

  @Post('generate-report')
  @UseGuards(JwtGuard)
  @UseInterceptors(FilesInterceptor('files'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  generateReport(
    @Request() req: BasicUserInfo,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.reportsService.generateReport(
      req.user.userID,
      req.user.role as Role,
      files,
    );
  }


  @Get('images/:userID/:reportID')
  @UseGuards(JwtGuard)
  getImages(
    @Request() req: BasicUserInfo,
    @Param("reportID", ParseIntPipe) reportID: number,
    @Param("userID", ParseIntPipe) userID: number
  ) {
    return this.reportsService.getImages(req.user.userID, reportID, userID, req.user.role as Role);
  }


}