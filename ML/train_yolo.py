from ultralytics import YOLO

# 1. Wczytanie pretrenowanego modelu (np. YOLOv8n)
model = YOLO("yolov8n.pt")

# 2. Trening na własnym zbiorze
results = model.train(
    data="data.yaml",   # ścieżka do pliku data.yaml
    epochs=50,          # liczba epok
    imgsz=640,          # rozmiar obrazów
    batch=16,           # rozmiar batcha
    device='cpu'            # GPU (0) lub CPU ('cpu')
)

# 3. Zapis modelu
model.save("trained_yolov8.pt")

print("Model zapisany jako trained_yolov8.pt")
