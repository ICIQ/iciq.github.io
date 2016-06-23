---
layout: post
title: NVidia Linux driver update fixed the openGL problem for Matlab 2016a
tags:
    - matlab
category:
    - computer
---
When the Matlab 2016a was released initially, the [openGL render was not compatible with some NVidia drivers in Linux](http://askubuntu.com/questions/765455/how-to-run-matlab-2016a-with-nvidia-drivers-of-gtx-960-in-ubuntu-16-04).
Recently, I have noticed that the last update of NVidia-367 driver has fixed this problem.

To install the nvidia-367 driver in Ubuntu 16.04, you need to uninstall the previous nvidia driver first:
```
sudo apt purge nvidia*
```
followed by a reboot of your computer.

Then install the new driver by adding the ppa and retrieving the package from the repo.
```
sudo add-apt-repository ppa:graphics-drivers/ppa
sudo apt update
sudo apt install NVidia-367
```
After a successful reboot, you should see the new driver has been added to your module list.
```
lsmod | grep nvidia
```
Matlab should work smoothly now with a better graphics render.
On my laptop, I got the following information in the Matlab command line window:
```Matlab
>> opengl info
                          Version: '4.5.0 NVIDIA 367.27'
                           Vendor: 'NVIDIA Corporation'
                         Renderer: 'Quadro M1000M/PCIe/SSE2'
                   MaxTextureSize: 16384
                           Visual: 'Visual 0x70, (RGBA 32 bits (8 8 8 8), Z depth 16 bits…'
                         Software: 'false'
             HardwareSupportLevel: 'full'
        SupportsGraphicsSmoothing: 1
    SupportsDepthPeelTransparency: 1
       SupportsAlignVertexCenters: 1
                       Extensions: {330x1 cell}
               MaxFrameBufferSize: 16384
```
This was tested working on my Lenovo Thinkpad P50 mobile workstation with Quadro M1000M GPU with Linux kernel 4.5.2 and 4.4.22.
Kernel 4.6.0 was not compatible with some latest nvidia drivers before this update, and I haven't got a chance to try again.

You may want to remove the graphics driver ppa after this to prevent new updates on the driver which may break your software environment again.
