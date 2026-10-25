#!/usr/bin/env python3
"""
Convert Hero (300) and About (241) animation frames from JPEG to WebP.
Uses parallel ffmpeg execution for optimal compression and speed.
Calculates exact file-size metrics and verifies frame count and decode integrity.
"""

import os
import glob
import subprocess
from concurrent.futures import ProcessPoolExecutor, as_completed
from PIL import Image

HERO_DIR = "/mnt/d/Vyuk Projects/Rayhan-Portfolio/public/hero-frames"
ABOUT_DIR = "/mnt/d/Vyuk Projects/Rayhan-Portfolio/public/frames"
QUALITY = 26

def convert_frame(jpg_path):
    webp_path = os.path.splitext(jpg_path)[0] + ".webp"
    cmd = [
        "ffmpeg", "-y", "-loglevel", "error",
        "-i", jpg_path,
        "-c:v", "libwebp",
        "-compression_level", "6",
        "-q:v", str(QUALITY),
        webp_path
    ]
    subprocess.run(cmd, check=True)
    orig_size = os.path.getsize(jpg_path)
    webp_size = os.path.getsize(webp_path)
    
    # Verify image integrity
    with Image.open(webp_path) as im:
        im.verify()
        
    return jpg_path, webp_path, orig_size, webp_size

def process_directory(directory, expected_count, label):
    print(f"\nProcessing {label} frames in {directory}...")
    jpg_files = sorted(glob.glob(os.path.join(directory, "*.jpg")))
    if len(jpg_files) != expected_count:
        print(f"WARNING: Expected {expected_count} frames, found {len(jpg_files)}")
        
    results = []
    with ProcessPoolExecutor(max_workers=os.cpu_count() or 4) as executor:
        futures = {executor.submit(convert_frame, f): f for f in jpg_files}
        for future in as_completed(futures):
            results.append(future.result())
            
    # Verification
    webp_files = sorted(glob.glob(os.path.join(directory, "*.webp")))
    print(f"Verified: {len(webp_files)} WebP frames generated (expected: {expected_count}).")
    
    orig_total = sum(r[2] for r in results)
    webp_total = sum(r[3] for r in results)
    savings = ((orig_total - webp_total) / orig_total) * 100
    
    print(f"{label} Original (JPEG): {orig_total:,} bytes ({orig_total / (1024*1024):.2f} MB)")
    print(f"{label} Converted (WebP): {webp_total:,} bytes ({webp_total / (1024*1024):.2f} MB)")
    print(f"{label} Savings: {savings:.2f}% (formula: ((orig - conv) / orig) * 100)")
    
    return orig_total, webp_total, len(webp_files)

def main():
    print("Starting WebP Conversion for Mission 7...")
    hero_orig, hero_webp, hero_count = process_directory(HERO_DIR, 300, "Hero")
    about_orig, about_webp, about_count = process_directory(ABOUT_DIR, 241, "About")
    
    total_orig = hero_orig + about_orig
    total_webp = hero_webp + about_webp
    total_savings = ((total_orig - total_webp) / total_orig) * 100
    
    print("\n" + "="*50)
    print("TOTAL ASSET OPTIMIZATION RESULTS:")
    print(f"Total Frames Converted: {hero_count + about_count} (Hero: {hero_count}, About: {about_count})")
    print(f"Total Original JPEG: {total_orig:,} bytes ({total_orig / (1024*1024):.2f} MB)")
    print(f"Total Converted WebP: {total_webp:,} bytes ({total_webp / (1024*1024):.2f} MB)")
    print(f"Absolute Bytes Saved: {total_orig - total_webp:,} bytes ({(total_orig - total_webp) / (1024*1024):.2f} MB)")
    print(f"Overall Savings Percentage: {total_savings:.2f}%")
    print("="*50)

if __name__ == "__main__":
    main()
