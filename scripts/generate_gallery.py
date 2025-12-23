import os
import json

GALLERY_DIR = 'assets/images/gallery'
OUTPUT_FILE = 'gallery_data.json'

def generate_gallery_json():
    gallery_data = {}
    
    # Check current directory to ensure we run from root or handle paths correctly
    # Assumes script is run from project root or we adjust path
    if not os.path.exists(GALLERY_DIR):
        # Try adjusting if run from scripts/
        if os.path.exists(os.path.join('..', GALLERY_DIR)):
             # We are in scripts/, move up
             os.chdir('..')
        else:
            print(f"Directory {GALLERY_DIR} not found.")
            return

    for category in os.listdir(GALLERY_DIR):
        if category.startswith('.'): continue
        
        category_path = os.path.join(GALLERY_DIR, category)
        if os.path.isdir(category_path):
            images = []
            for filename in os.listdir(category_path):
                if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp', '.gif')):
                    # Web path relative to root
                    web_path = f"{GALLERY_DIR}/{category}/{filename}"
                    images.append(web_path)
            
            # Sort images to have deterministic order
            gallery_data[category] = sorted(images)

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(gallery_data, f, indent=2)
    
    print(f"Generated {OUTPUT_FILE} with categories: {list(gallery_data.keys())}")

if __name__ == "__main__":
    generate_gallery_json()
