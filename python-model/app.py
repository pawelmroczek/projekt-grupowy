from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from PIL import Image
import io

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Model API działa poprawnie 🚀"}

@app.post("/predict")
async def predict(image: UploadFile = File(...)):
    # odczytaj obrazek
    image_bytes = await image.read()
    img = Image.open(io.BytesIO(image_bytes))

    # tu na razie symulujemy predykcję
    # zamiast model.predict(img) — po prostu zwracamy placeholder
    result = {
        "class": "example_class",
        "confidence": 0.95,
        "size": img.size
    }

    return JSONResponse(content=result)
