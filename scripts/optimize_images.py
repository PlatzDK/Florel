import os
from PIL import Image

GALLERY_DIR = 'assets/images/gallery'

def optimize_images():
    # Handle running from root or scripts dir
    target_dir = GALLERY_DIR
    if not os.path.exists(target_dir) and os.path.exists(os.path.join('..', GALLERY_DIR)):
        target_dir = os.path.join('..', GALLERY_DIR)

    if not os.path.exists(target_dir):
        print(f"Directory {target_dir} not found.")
        return

    print(f"Scanning {target_dir} for images to optimize...")

    for root, dirs, files in os.walk(target_dir):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                file_path = os.path.join(root, file)
                try:
                    file_size_mb = os.path.getsize(file_path) / (1024 * 1024)
                except OSError:
                    continue
                
                # Optimizing strategy:
                # 1. Convert to WebP
                # 2. Resize to max 1920px width/height
                # 3. Quality 80
                
                # We optimize if it's not a webp (which we filter for above)
                # or if it is notably large (though right now we only catch png/jpg)
                
                print(f"Optimizing {file} ({file_size_mb:.2f} MB)...")
                try:
                    with Image.open(file_path) as img:
                        # Fix orientation if needed (EXIF data)
                        from PIL import ImageOps
                        img = ImageOps.exif_transpose(img)

                        # Calculate new size maintaining aspect ratio
                        max_size = 1920
                        ratio = min(max_size / img.width, max_size / img.height)
                        
                        # Only resize if it's actually larger than max_size
                        if ratio < 1:
                            new_size = (int(img.width * ratio), int(img.height * ratio))
                            img = img.resize(new_size, Image.Resampling.LANCZOS)
                        
                        # Save as WebP
                        new_file_name = os.path.splitext(file)[0] + ".webp"
                        new_file_path = os.path.join(root, new_file_name)
                        
                        img.save(new_file_path, "WEBP", quality=80)
                        
                        print(f"Saved optimized version: {new_file_name}")
                        
                        # Verify the new file exists before deleting the old one
                        if os.path.exists(new_file_path):
                            os.remove(file_path)
                            print(f"Removed original: {file}")
                            
                except Exception as e:
                    print(f"Failed to optimize {file}: {e}")

    print("Optimization complete.")

if __name__ == "__main__":
    optimize_images()
