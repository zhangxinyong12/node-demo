// 获取指定目录总文件数目
const fs = require('fs');
const path = require('path');
// 
const dataList = []; // 保存查找到的文件
const PAHT = 'D:/';
const filePath = path.join(PAHT);

const getAllFiles = () => {
    const file = fs.readdirSync(filePath);
    console.log(filePath, file);
};
getAllFiles();