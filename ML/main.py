from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from ultralytics import YOLO
from PIL import Image
import io

# 1. Inicjalizacja aplikacji
app = FastAPI(title="YOLOv8 Image Classification API")

# 2. Ładowanie wytrenowanego modelu
model = YOLO("trained_yolov8.pt")

# 3. Endpoint do predykcji
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Wczytanie obrazu
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")

        # Predykcja
        results = model(image)

        # Pobranie wyników
        boxes = results[0].boxes
        names = model.names  # słownik {id: nazwa_klasy}

        detections = []
        for box in boxes:
            cls_id = int(box.cls[0])
            conf = float(box.conf[0])
            detections.append({
                "category": names[cls_id],
                "confidence": round(conf, 3)
            })

        return JSONResponse(content={
            "detections": detections
        })

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
