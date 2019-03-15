/*
 * 去掉每个像素的颜色，只保留了亮度接近的灰度值（即彩色变黑白）
*/
var drawing = document.getElementById('drawing');

if(drawing.getContext){
    var context = drawing.getContext('2d'),
        image = document.images[0],
        imageData,data,
        i,len,average,
        red,green,blue,alpha;

        context.drawImage(image,0,0);
        imageData = context.getImageData(0,0,image.width,image.height);

        for(i=0,len=data.length ; i<len ; i+=4){
            red = data[i];
            green = data[i+1];
            blue = data[i+2];
            alpha = data[i+3];

            average = Math.floor((red+green+blue)/3);

            data[i] = average;
            data[i+1] = average;
            data[i+2] = average;
        }
        imageData.data = data;
        context.putImageData(imageData,0,0);
}