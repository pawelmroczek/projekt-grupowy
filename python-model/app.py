from fastapi import FastAPI, File, UploadFile
from ultralytics import YOLO
from PIL import Image
import io

app = FastAPI()
model = YOLO("model/best.pt")

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
