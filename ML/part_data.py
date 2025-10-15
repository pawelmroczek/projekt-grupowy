import os
import random
import shutil
from pathlib import Path

# Ścieżki do danych
data_dir = Path("yolov8")
images_dir = data_dir / "images"
labels_dir = data_dir / "labels"

# Nowe foldery
train_images = data_dir / "images" / "train"
val_images = data_dir / "images" / "val"
train_labels = data_dir / "labels" / "train"
val_labels = data_dir / "labels" / "val"

# Utwórz katalogi
for d in [train_images, val_images, train_labels, val_labels]:
    d.mkdir(parents=True, exist_ok=True)

# Lista wszystkich obrazów
image_files = [f for f in images_dir.glob("*.jpg")]  # zmień na *.png jeśli trzeba
random.shuffle(image_files)

# Proporcje podziału
train_ratio = 0.8
split_index = int(len(image_files) * train_ratio)

train_files = image_files[:split_index]
val_files = image_files[split_index:]

def move_files(files, img_dest, lbl_dest):
    for img_path in files:
        lbl_path = labels_dir / (img_path.stem + ".txt")
        if lbl_path.exists():
            shutil.copy(img_path, img_dest / img_path.name)
            shutil.copy(lbl_path, lbl_dest / lbl_path.name)
        else:
            print(f"⚠️ Brak etykiety dla: {img_path.name}")

# Przenieś dane
move_files(train_files, train_images, train_labels)
move_files(val_files, val_images, val_labels)

print(f"✅ Dane podzielone: {len(train_files)} train / {len(val_files)} val")
