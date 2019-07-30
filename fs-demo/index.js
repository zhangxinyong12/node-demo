const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 't.txt');
const filePath1 = path.join(__dirname, 't.txt');
console.log(__dirname);
// -- 异步读取文件
// fs.readFile(filePath, 'utf8', function (err, data) {
//     console.log(typeof data);
//     console.log(data);
// });

// -- 同步读取文件
const fileResult = fs.readFileSync(filePath, 'utf8');
// console.log(fileResult);

// 文件写入 覆盖原有内容 如果没有。就创建文件
fs.writeFile('filePath.txt', `写入的内容`, (err) => {
    if (err) {
        throw (err);
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    // console.log(data);
});

// 文件追加 appendFile
fs.appendFileSync(filePath, '文件添加内容，保留原有的\n' + new Date().getTime());

// 拷贝文件 copyFile
fs.copyFileSync(filePath, '备份文件.txt');
// 删除文件 unlink
// fs.unlinkSync('备份文件.txt');
// 文件打开 fs.open
// 
let buf = Buffer.alloc(6);// 创建6字节长度的buf缓存对象

fs.open(filePath, 'r', '0666', (err, fd) => {
    console.log('文件描述', fd);
    // fd：文件描述符，使用fs.open 打开成功后返回的；
    // buffer：一个 Buffer 对象，v8 引擎分配的一段内存，存储将要写入文件数据的 Buffer；
    // offset：整数，从 Buffer 缓存区读取数据的初始位置，以字节为单位；
    // length：整数，读取 Buffer 数据的字节数；
    // position：整数，写入文件初始位置；
    // callback：写入操作执行完成后回调函数，有三个参数 err（错误），bytesWritten（实际写入的字节数），buffer（被读取的缓存区对象），写入完成后执行。
    fs.read(fd, buf, 0, 3, 0, (err, bytestRead, buffer) => {
        console.log(bytestRead, buffer, buffer.toString());
        // 继续读取
        fs.read(fd, buf, 0, 6, 89, (err, bytesRead, buffer) => {
            console.log(bytesRead);
            console.log(buffer);
            console.log(buffer.toString());
            // 文件关闭 fs.close
            fs.closeSync(fd);
        });
    });
});
// 目录操作
// fs.mkdir
// fs.rmdirSync('./test');
// fs.mkdirSync('./test');
// 读取目录 fs.readdir
// const mkdirList = fs.readdirSync('./');
// console.log(mkdirList, '0000000000000000');

fs.readdir('./', (err, data) => {
    if (err) {
        return;
    }
    console.log('-------', data);
    data.forEach((item) => {
        const child = fs.lstatSync(item);
        // true为文件夹
        console.log(child.isDirectory());
    });
});