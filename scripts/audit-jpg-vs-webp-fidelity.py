import os
import math
import numpy as np
from PIL import Image

HERO_JPG_DIR = "/home/rayhan/Videos/hero-frames"
HERO_WEBP_DIR = "/mnt/d/Vyuk Projects/Rayhan-Portfolio/public/hero-frames"
ABOUT_JPG_DIR = "/home/rayhan/Videos/frames"
ABOUT_WEBP_DIR = "/mnt/d/Vyuk Projects/Rayhan-Portfolio/public/frames"

def calculate_psnr(img1, img2):
    mse = np.mean((img1.astype(np.float64) - img2.astype(np.float64)) ** 2)
    if mse == 0:
        return 100.0
    max_pixel = 255.0
    return 20 * math.log10(max_pixel / math.sqrt(mse))

def calculate_ssim(img1, img2):
    # Simplified SSIM for grayscale/luminance
    C1 = (0.01 * 255) ** 2
    C2 = (0.03 * 255) ** 2
    
    img1 = img1.astype(np.float64)
    img2 = img2.astype(np.float64)
    
    mu1 = np.mean(img1)
    mu2 = np.mean(img2)
    sigma1_sq = np.var(img1)
    sigma2_sq = np.var(img2)
    sigma12 = np.cov(img1.flatten(), img2.flatten())[0, 1]
    
    ssim = ((2 * mu1 * mu2 + C1) * (2 * sigma12 + C2)) / ((mu1**2 + mu2**2 + C1) * (sigma1_sq + sigma2_sq + C2))
    return ssim

def audit_sequence(name, jpg_dir, webp_dir, frame_indices):
    print(f"\n--- AUDITING {name} SEQUENCE ---")
    results = []
    for idx in frame_indices:
        pad_idx = f"{idx:03d}"
        jpg_path = os.path.join(jpg_dir, f"ezgif-frame-{pad_idx}.jpg")
        webp_path = os.path.join(webp_dir, f"ezgif-frame-{pad_idx}.webp")
        
        if not os.path.exists(jpg_path) or not os.path.exists(webp_path):
            print(f"Skipping frame {idx}: file not found")
            continue
            
        with Image.open(jpg_path) as j_img, Image.open(webp_path) as w_img:
            j_arr = np.array(j_img.convert("RGB"))
            w_arr = np.array(w_img.convert("RGB"))
            
            psnr = calculate_psnr(j_arr, w_arr)
            # Grayscale for SSIM
            j_gray = np.array(j_img.convert("L"))
            w_gray = np.array(w_img.convert("L"))
            ssim = calculate_ssim(j_gray, w_gray)
            
            # Dark gradient check (luminance < 40)
            dark_mask = j_gray < 40
            if np.any(dark_mask):
                dark_mse = np.mean((j_gray[dark_mask].astype(np.float64) - w_gray[dark_mask].astype(np.float64)) ** 2)
            else:
                dark_mse = 0.0
                
            results.append({
                "frame": f"ezgif-frame-{pad_idx}",
                "psnr_db": round(psnr, 2),
                "ssim": round(float(ssim), 4),
                "dark_gradient_mse": round(float(dark_mse), 3)
            })
            print(f"Frame {pad_idx}: PSNR = {psnr:.2f} dB, SSIM = {ssim:.4f}, Dark MSE = {dark_mse:.3f}")
            
    avg_psnr = np.mean([r["psnr_db"] for r in results])
    avg_ssim = np.mean([r["ssim"] for r in results])
    print(f"Average PSNR: {avg_psnr:.2f} dB | Average SSIM: {avg_ssim:.4f}")
    return results

if __name__ == "__main__":
    hero_frames = [1, 50, 100, 150, 200, 250, 300]
    about_frames = [1, 40, 80, 120, 160, 200, 241]
    
    hero_res = audit_sequence("HERO", HERO_JPG_DIR, HERO_WEBP_DIR, hero_frames)
    about_res = audit_sequence("ABOUT", ABOUT_JPG_DIR, ABOUT_WEBP_DIR, about_frames)
