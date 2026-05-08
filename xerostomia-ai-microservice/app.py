from fastapi import FastAPI, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from unsloth import FastVisionModel
from PIL import Image
import torch
import torch.nn.functional as F
import os
import io

INSTRUCTION_ZERO_SHOT = (
    """Analyze this intraoral image for visual signs of xerostomia. 
    Reply ONLY with the word "Yes" or "No". No explenation"""
)

def diagnose_image_soft(image_content, instruction, model, tokenizer):
    image = Image.open(io.BytesIO(image_content)).convert("RGB")
    
    messages = [
        {"role": "user", "content": [
            {"type": "image"},
            {"type": "text", "text": instruction}
        ]}
    ]
    
    input_text = tokenizer.apply_chat_template(messages, add_generation_prompt=True)
    
    inputs = tokenizer(
        image,
        input_text,
        add_special_tokens=False,
        return_tensors="pt",
    ).to("cuda")

    # Get logits
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits[:, -1, :] 

    yes_token_id = tokenizer.tokenizer.encode("Yes", add_special_tokens=False)[-1]
    no_token_id = tokenizer.tokenizer.encode("No", add_special_tokens=False)[-1]

    yes_logit = logits[:, yes_token_id]
    no_logit = logits[:, no_token_id]

    probs = F.softmax(torch.cat([no_logit, yes_logit]), dim=-1)
    prob_yes = probs[1].item() 
    
    return prob_yes

@asynccontextmanager
async def lifespan(app: FastAPI):
    model, tokenizer = FastVisionModel.from_pretrained(
        model_name = "outputs_medgemma_prod_mdl", 
        load_in_4bit = False, # Using 16-bit 
        use_gradient_checkpointing = "unsloth",
    )
    FastVisionModel.for_inference(model)
    app.state.model = model
    app.state.tokenizer = tokenizer


    yield
    del app.state.model
    del app.state.tokenizer

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "online", "model": "google/medgemma-1.5-4b-it"}

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/diagnose")
async def diagnose(files: list[UploadFile]):
    results = []
    
    for file in files:
        content = await file.read()
        
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as f:
            f.write(content)
            
        prob_yes = diagnose_image_soft(
            content, 
            INSTRUCTION_ZERO_SHOT, 
            app.state.model, 
            app.state.tokenizer
        )
        
        result_entry = {
            "image": file.filename,
            "prob_yes": round(prob_yes, 4),
        }
        
        results.append(result_entry)
        
        os.remove(file_path)

    return results