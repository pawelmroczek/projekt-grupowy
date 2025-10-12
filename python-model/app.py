from fastapi import FastAPI, File, UploadFile
from fastapi.responses import StreamingResponse, JSONResponse
from ultralytics import YOLO
from PIL import Image
import io
from rembg import remove

app = FastAPI()
model = YOLO("model/best.pt")

def remove_background(image_bytes: bytes) -> bytes:
    return remove(image_bytes)

@app.get("/")
def root():
    return {"message": "Model API działa poprawnie :)"}

@app.post("/predict")
async def predict(image: UploadFile = File(...)):
    # odczytaj obrazek
    image_bytes = await image.read()
    img = Image.open(io.BytesIO(image_bytes))
    
    results = model.predict(img, conf=0.4, verbose=False)
    detections = []
    for result in results:
        for box in result.boxes:
            cls_id = int(box.cls[0])
            conf = float(box.conf[0])
            label = model.names[cls_id]
            detections.append({
                "class": label,
                "confidence": round(conf, 3)
            })

    # If there was no detections
    if not detections:
        return {"detections": [], "message": "No symbols detected"}

    return {"detections": detections}

@app.post("/remove/bg")
async def remove_bg(image: UploadFile = File(...)):
    try:
        image_bytes = await image.read()

        output_data = remove_background(image_bytes)

        return StreamingResponse(
            io.BytesIO(output_data),
            media_type="image/png",
            headers={"Content-Disposition": "attachment; filename=no_bg.png"}
        )
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})