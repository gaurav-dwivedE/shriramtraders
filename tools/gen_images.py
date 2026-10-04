# Generates stand-in textured images. Replace with real photos of the same filenames.
import numpy as np,random
from PIL import Image,ImageDraw,ImageFilter,ImageFont
random.seed(4);np.random.seed(4)
O='public/images/'
def noise(im,s=10):
    a=np.asarray(im).astype(np.int16)+np.random.randint(-s,s,(im.height,im.width,1));return Image.fromarray(np.clip(a,0,255).astype('uint8'))
def finish(im,name,blur=.8,s=9):
    im=noise(im.filter(ImageFilter.GaussianBlur(blur)),s).convert('RGB')
    vg=Image.new('L',im.size,0);d=ImageDraw.Draw(vg);d.ellipse((-im.width*.2,-im.height*.2,im.width*1.2,im.height*1.2),fill=255)
    vg=vg.filter(ImageFilter.GaussianBlur(im.width//6));im=Image.composite(im,Image.eval(im,lambda v:int(v*.55)),vg)
    im.save(O+name+'.jpg',quality=82)
def grad(w,h,c1,c2):
    t=np.linspace(0,1,h)[:,None,None];a=np.array(c1)*(1-t)+np.array(c2)*t;return Image.fromarray(np.repeat(a,w,1).astype('uint8'))
W,H=1200,900
def font(n):
    try:return ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',n)
    except:return ImageFont.load_default()
def floor_bg(c1=(150,140,125),c2=(95,88,78)):return grad(W,H,c1,c2)
def bag(name,body,band,txt):
    im=floor_bg();d=ImageDraw.Draw(im)
    for k,(x,y,s) in enumerate([(260,300,1),(620,330,1),(440,120,1)]):
        w,h=360,300;d.rounded_rectangle((x+14,y+16,x+w+14,y+h+16),30,fill=(60,55,50))
        d.rounded_rectangle((x,y,x+w,y+h),26,fill=body);d.rectangle((x,y+90,x+w,y+190),fill=band)
        d.text((x+w//2,y+140),txt,font=font(46),fill=(255,255,255),anchor='mm');d.text((x+w//2,y+235),'50 KG',font=font(30),fill=(235,235,235),anchor='mm')
        d.line((x+20,y+20,x+w-20,y+20),fill=(255,255,255),width=2)
    finish(im,name,1.1)
def tmt():
    im=grad(W,H,(110,115,120),(55,58,62));d=ImageDraw.Draw(im)
    for r in range(14):
        y=80+r*58+random.randint(-4,4);d.rectangle((0,y,W,y+34),fill=(70+r%3*6,62,58))
        d.rectangle((0,y+4,W,y+11),fill=(135,110,95))
        for x in range(0,W,26):d.line((x,y,x+10,y+34),fill=(50,45,42),width=3)
    for r in range(14):d.ellipse((W-90,80+r*58,W-40,114+r*58),fill=(190,95,45))
    finish(im,'tmt',.9)
def steel():
    im=grad(W,H,(150,155,160),(70,74,78));d=ImageDraw.Draw(im)
    for k in range(7):
        x=60+k*160;d.polygon([(x,100),(x+120,100),(x+120,780),(x+100,780),(x+100,120),(x,120)],fill=(95+k*5,100+k*4,105+k*4))
    for k in range(4):d.rectangle((120+k*250,640-k*40,320+k*250,700-k*40),fill=(130,135,140))
    finish(im,'steel',1)
def sand(name,c1,c2):
    im=grad(W,H,c1,c2);d=ImageDraw.Draw(im)
    for k in range(6):
        pts=[(0,H)]+[(x,int(380+k*70+np.sin(x/190+k)*55)) for x in range(0,W+60,60)]+[(W,H)]
        d.polygon(pts,fill=tuple(int(v*(1-k*.05)) for v in c1))
    im=noise(im,16);finish(im,name,.7,14)
def gitti():
    im=Image.new('RGB',(W,H),(100,98,95));d=ImageDraw.Draw(im)
    for _ in range(2600):
        x,y=random.randint(0,W),random.randint(0,H);r=random.randint(10,28);g=random.randint(70,170)
        pts=[(x+r*np.cos(a+random.random()*.6),y+r*np.sin(a+random.random()*.6)*.8) for a in np.linspace(0,6.28,7)[:-1]]
        d.polygon(pts,fill=(g,g-3,g-6),outline=(45,43,40))
    finish(im,'gitti',.6,12)
def brick():
    im=Image.new('RGB',(W,H),(170,160,145));d=ImageDraw.Draw(im);bw,bh=190,70
    for r in range(0,H//(bh+8)+1):
        off=(bw//2+4) if r%2 else 0
        for c in range(-1,W//(bw+8)+2):
            x=c*(bw+8)-off;y=r*(bh+8);t=random.randint(-18,18)
            d.rectangle((x,y,x+bw,y+bh),fill=(165+t,70+t//2,48+t//3));d.line((x,y,x+bw,y),fill=(195,100,75),width=3)
    finish(im,'brick',.8,14)
def aac():
    im=Image.new('RGB',(W,H),(200,198,192));d=ImageDraw.Draw(im);bw,bh=300,130
    for r in range(0,H//(bh+8)+1):
        off=(bw//2+4) if r%2 else 0
        for c in range(-1,W//(bw+8)+2):
            x=c*(bw+8)-off;y=r*(bh+8);t=random.randint(-8,8)
            d.rectangle((x,y,x+bw,y+bh),fill=(228+t,226+t,220+t))
            for _ in range(60):px,py=random.randint(x,x+bw),random.randint(y,y+bh);d.ellipse((px,py,px+3,py+3),fill=(200,198,192))
    finish(im,'aac',.9,8)
def wire():
    im=grad(W,H,(120,115,108),(70,66,60));d=ImageDraw.Draw(im)
    for cx,cy in [(420,420),(780,470)]:
        for k in range(46):r=210-k*2;d.ellipse((cx-r,cy-r*.85,cx+r,cy+r*.85),outline=(60+k,60+k,65+k),width=3)
    finish(im,'wire',.9)
def site(name,w,h,sky,ground,crane=True,truck=False):
    im=grad(w,h,sky[0],sky[1]);d=ImageDraw.Draw(im);gy=int(h*.78)
    d.rectangle((0,gy,w,h),fill=ground)
    bx=int(w*.5)
    for f in range(5):
        y=gy-(f+1)*int(h*.1);d.rectangle((bx,y,bx+int(w*.28),y+6),fill=(70,70,72))
        for p in range(5):d.rectangle((bx+p*int(w*.07),y,bx+p*int(w*.07)+10,y+int(h*.1)),fill=(95,92,88))
    if crane:
        cx=int(w*.2);d.rectangle((cx,int(h*.1),cx+14,gy),fill=(230,170,0))
        d.rectangle((cx-int(w*.1),int(h*.1),cx+int(w*.28),int(h*.1)+12),fill=(230,170,0));d.line((cx+int(w*.2),int(h*.1)+12,cx+int(w*.2),int(h*.4)),fill=(40,40,40),width=3)
        for k in range(8):d.line((cx+k*14,int(h*.1),cx+k*14+14,int(h*.1)+60),fill=(200,150,0),width=2)
    if truck:
        tx,ty=int(w*.1),gy-int(h*.16);d.rectangle((tx,ty,tx+int(w*.28),gy),fill=(166,43,31));d.rectangle((tx+int(w*.28),ty+30,tx+int(w*.38),gy),fill=(60,60,64))
        for wx in (tx+60,tx+int(w*.3)):d.ellipse((wx,gy-26,wx+52,gy+26),fill=(25,25,25))
    finish(im,name,1.2,8)
bag('cement-ultratech',(40,90,170),(235,235,235),'CEMENT');bag('cement-acc',(95,100,105),(245,150,30),'CEMENT')
tmt();steel();sand('sand',(214,190,140),(170,145,100));sand('msand',(170,160,148),(120,112,102));gitti();brick();aac();wire()
site('hero-cement',1920,800,((235,210,175),(250,240,225)),(150,135,115),True)
site('hero-steel',1920,800,((120,150,185),(215,225,235)),(110,108,105),True)
site('hero-bulk',1920,800,((240,190,130),(250,225,190)),(140,120,95),False,True)
site('about',1200,900,((150,180,210),(230,236,240)),(125,115,100),True,True)
site('warehouse',1200,900,((200,200,200),(235,235,235)),(120,118,112),False,True)
