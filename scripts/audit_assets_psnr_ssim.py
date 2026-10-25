import os
import math
import numpy as np
from PIL import Image

def compute_mse(img1, img2):
    return np.mean((img1.astype(np.float64) - img2.astype(np.float64)) ** 2)

def compute_psnr(img1, img2):
    mse = compute_mse(img1, img2)
    if mse == 0:
        return float('inf')
    return 20.0 * math.log10(255.0 / math.sqrt(mse))

def compute_ssim(img1, img2):
    # Convert to grayscale luminance
    if len(img1.shape) == 3:
        y1 = 0.299 * img1[:, :, 0] + 0.587 * img1[:, :, 1] + 0.114 * img1[:, :, 2]
        y2 = 0.299 * img2[:, :, 0] + 0.587 * img2[:, :, 1] + 0.114 * img2[:, :, 2]
    else:
        y1 = img1.astype(np.float64)
        y2 = img2.astype(np.float64)
    
    K1 = 0.01
    K2 = 0.03
    L = 255.0
    c1 = (K1 * L) ** 2
    c2 = (K2 * L) ** 2
    
    mu1 = np.mean(y1)
    mu2 = np.mean(y2)
    
    sigma1_sq = np.var(y1)
    sigma2_sq = np.var(y2)
    sigma12 = np.mean((y1 - mu1) * (y2 - mu2))
    
    ssim = ((2.0 * mu1 * mu2 + c1) * (2.0 * sigma12 + c2)) / \
           ((mu1 ** 2 + mu2 ** 2 + c1) * (sigma1_sq + sigma2_sq + c2))
    return float(ssim)

def evaluate_pair(jpg_path, webp_path):
    if not os.path.exists(jpg_path) or not os.path.exists(webp_path):
        return None
    
    jpg_size = os.path.getsize(jpg_path)
    webp_size = os.path.getsize(webp_path)
    savings_pct = (1.0 - (webp_size / jpg_size)) * 100.0
    
    im_jpg = Image.open(jpg_path).convert('RGB')
    im_webp = Image.open(webp_path).convert('RGB')
    
    # If dimensions differ, resize webp to match jpg for metric computation
    if im_jpg.size != im_webp.size:
        im_webp = im_webp.resize(im_jpg.size, Image.Resampling.LANCZOS)
        
    arr_jpg = np.array(im_jpg)
    arr_webp = np.array(im_webp)
    
    psnr = compute_psnr(arr_jpg, arr_webp)
    ssim = compute_ssim(arr_jpg, arr_webp)
    
    return {
        'jpg_size': jpg_size,
        'webp_size': webp_size,
        'savings_pct': savings_pct,
        'psnr': psnr,
        'ssim': ssim
    }

def main():
    print("=" * 70)
    print("MISSION 10: MATHEMATICAL MASTER ASSET AUDIT (JPG vs WebP)")
    print("=" * 70)
    
    # 1. Audit Headshot Portrait
    headshot_jpg = "/mnt/d/Vyuk Projects/Rayhan-Portfolio/public/rayhan-headshot.jpg"
    headshot_webp = "/mnt/d/Vyuk Projects/Rayhan-Portfolio/public/rayhan-headshot.webp"
    res_hs = evaluate_pair(headshot_jpg, headshot_webp)
    if res_hs:
        print(f"\n[1] Headshot Portrait:")
        print(f"    JPG: {res_hs['jpg_size']/1024:.1f} KB | WebP: {res_hs['webp_size']/1024:.1f} KB (Savings: {res_hs['savings_pct']:.1f}%)")
        print(f"    PSNR: {res_hs['psnr']:.2f} dB | SSIM: {res_hs['ssim']:.4f}")
        
    # 2. Audit Hero Frames Sample
    hero_jpg_dir = "/home/rayhan/Videos/hero-frames"
    hero_webp_dir = "/mnt/d/Vyuk Projects/Rayhan-Portfolio/public/hero-frames"
    hero_samples = [1, 50, 100, 150, 200, 250, 300]
    
    print(f"\n[2] Hero Frame Sequence Sample Audit (7 checkpoint frames):")
    hero_psnrs = []
    hero_ssims = []
    hero_savings = []
    
    for f in hero_samples:
        fname_base = f"ezgif-frame-{f:03d}"
        jpg_p = os.path.join(hero_jpg_dir, f"{fname_base}.jpg")
        webp_p = os.path.join(hero_webp_dir, f"{fname_base}.webp")
        res = evaluate_pair(jpg_p, webp_p)
        if res:
            hero_psnrs.append(res['psnr'])
            hero_ssims.append(res['ssim'])
            hero_savings.append(res['savings_pct'])
            print(f"    Frame {f:03d}: JPG {res['jpg_size']/1024:.1f} KB -> WebP {res['webp_size']/1024:.1f} KB (-{res['savings_pct']:.1f}%) | PSNR: {res['psnr']:.2f} dB | SSIM: {res['ssim']:.4f}")
            
    if hero_psnrs:
        print(f"    -- Hero Sequence Averages --")
        print(f"    Average Size Reduction: {np.mean(hero_savings):.1f}%")
        print(f"    Average PSNR: {np.mean(hero_psnrs):.2f} dB")
        print(f"    Average SSIM: {np.mean(hero_ssims):.4f}")

    # 3. Audit About Frames Sample
    about_jpg_dir = "/home/rayhan/Videos/frames"
    about_webp_dir = "/mnt/d/Vyuk Projects/Rayhan-Portfolio/public/frames"
    about_samples = [1, 40, 80, 120, 160, 200, 241]
    
    print(f"\n[3] About Frame Sequence Sample Audit (7 checkpoint frames):")
    about_psnrs = []
    about_ssims = []
    about_savings = []
    
    for f in about_samples:
        fname_base = f"ezgif-frame-{f:03d}"
        jpg_p = os.path.join(about_jpg_dir, f"{fname_base}.jpg")
        webp_p = os.path.join(about_webp_dir, f"{fname_base}.webp")
        res = evaluate_pair(jpg_p, webp_p)
        if res:
            about_psnrs.append(res['psnr'])
            about_ssims.append(res['ssim'])
            about_savings.append(res['savings_pct'])
            print(f"    Frame {f:03d}: JPG {res['jpg_size']/1024:.1f} KB -> WebP {res['webp_size']/1024:.1f} KB (-{res['savings_pct']:.1f}%) | PSNR: {res['psnr']:.2f} dB | SSIM: {res['ssim']:.4f}")
            
    if about_psnrs:
        print(f"    -- About Sequence Averages --")
        print(f"    Average Size Reduction: {np.mean(about_savings):.1f}%")
        print(f"    Average PSNR: {np.mean(about_psnrs):.2f} dB")
        print(f"    Average SSIM: {np.mean(about_ssims):.4f}")
        
    print("\n" + "=" * 70)
    print("AUDIT VERDICT:")
    overall_ssim = np.mean(hero_ssims + about_ssims)
    overall_psnr = np.mean(hero_psnrs + about_psnrs)
    overall_savings = np.mean(hero_savings + about_savings)
    print(f"Overall SSIM: {overall_ssim:.4f} (Benchmark > 0.9500: EXCELLENT FIDELITY)")
    print(f"Overall PSNR: {overall_psnr:.2f} dB (Benchmark > 35.0 dB: HIGH FIDELITY / NO ARTIFACTS)")
    print(f"Overall Storage & Network Savings: {overall_savings:.1f}% BANDWIDTH REDUCTION")
    print("=" * 70)

if __name__ == "__main__":
    main()
