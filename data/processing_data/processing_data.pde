size(280 , 280);

byte[] data = loadBytes("<file-name>.npy");
println(data.length);

int total = 1000;

byte[] outdata = new byte[total * 784];
int outindex = 0;
for(int n = 0;n < total;n++){
  int start = 80 + n * 784;
  PImage img = createImage(28 , 28 , RGB);
  img.loadPixels();
  for(int i=0;i<784;i++){
    int index = i + start;
    byte val = data[index];
    outdata[outindex] = val;
    outindex++;
    img.pixels[i] = color(val & 0xff);
  }
  img.updatePixels();
  int x = 28 * (n % 10);
  int y = 28 * (n / 10);
  
  image(img , x , y);
}

saveBytes("<output-file-name>.bin" , outdata);
