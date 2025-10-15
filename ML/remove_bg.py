from rembg import remove
from PIL import Image
import io

def remove_background(input_path: str, output_path: str):
    with open(input_path, 'rb') as i:
        input_data = i.read()
        output_data = remove(input_data)
        img = Image.open(io.BytesIO(output_data))
        img.save(output_path)

# Użycie
remove_background("img.jpg", "shirt_no_bg.png")
