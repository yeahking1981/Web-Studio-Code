const fs = require('fs');
const rollup = require('rollup');
const rollupPluginNodeResolve = require('@rollup/plugin-node-resolve');
const rollupPluginCommonjs = require('@rollup/plugin-commonjs');
const babel = require('@babel/core');
const cp = require('child_process');

// 生成banner
let banner = function (pkg) {
    return `/*!
* web Studio Code - `+ pkg.description + `
* `+ pkg.repository.url + `
*
* author `+ pkg.author + `
*
* version `+ pkg.version + `
*
* build Fri May 08 2020
*
* Copyright yelloxing
* Released under the `+ pkg.license + ` license
*
* Date:`+ new Date() + `
*/\n\n`;

};

module.exports = {

    // 当前配置文件的相对路径上下文
    path: __dirname,

    // package.json路径
    pkg: '.',

    // 定义任务
    task: {

        init(cuf, pkg) {

            cuf.print(pkg.name + "@" + pkg.version + " " + pkg.description);

            // 如果打包后的文件存在
            if (fs.existsSync('./dist')) cuf.deleteSync('./dist');

            cuf.log("\n-----------------------\n环境整理完毕，开始打包！\n-----------------------");
            cuf.print("Date : " + new Date() + "\n");

        },

        end(cuf) {

            cuf.log("\n-----------------------\n打包完毕！\n-----------------------");
            cuf.print("Date : " + new Date() + "\n\n");

            // 打印文件大小
            const printFileSize = function (index, url) {

                fs.stat(url, (err, stats) => {
                    if (err) {
                        console.log(err);
                    } else {
                        let size = (bytes => {
                            if (bytes < 1024) return bytes + " Bytes";
                            else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " KB";
                            else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MB";
                            else return (bytes / 1073741824).toFixed(3) + " GB";
                        })(stats.size);

                        cuf.log("[" + index + "]    " + url + "    " + size);
                    }

                });
            };

            printFileSize(1, './dist/wscode.js');
            printFileSize(2, './dist/wscode.min.js');

        },

        /**
         * 第一步：模块打包
         * ----------------------
         */
        bundle(cuf) {
            async function build(inputOptions, outputOptions) {
                const bundle = await rollup.rollup(inputOptions);
                await bundle.write(outputOptions);

                cuf.error('模块打包完毕');
            }

            cuf.log("\n[1]模块打包:./dist/module.new.js\n");

            build({
                input: 'src/index.js',
                plugins: [

                    // 帮助 Rollup 查找外部模块，然后安装
                    rollupPluginNodeResolve({
                        customResolveOptions: {
                            moduleDirectory: 'node_modules'
                        }
                    }),

                    // 将CommonJS模块转换为 ES2015 供 Rollup 处理
                    rollupPluginCommonjs({
                        include: "node_modules/**",
                        exclude: []
                    })

                ]
            }, {
                format: 'iife',
                name: "temp",
                file: './dist/module.new.js'
            });
        },

        /**
         * 第二步：babel转义
         * ----------------------
         */
        babel(cuf, pkg) {

            cuf.log("\n[2]babel转义:./dist/module.new.js → ./dist/wscode.js\n");

            babel.transformFile("./dist/module.new.js", {}, function (err, result) {
                if (!err) {
                    fs.writeFileSync("./dist/wscode.js", banner(pkg));
                    fs.appendFileSync("./dist/wscode.js", result.code);
                    cuf.deleteSync("./dist/module.new.js");

                    cuf.error('转义完毕');
                } else {
                    console.log(err);
                }
            });
        },

        /**
         * 第三步：压缩代码
         * ----------------------
         */
        uglifyjs(cuf, pkg) {

            cuf.log("\n[3]压缩代码:./dist/wscode.js → ./dist/wscode.min.js\n");

            cp.exec("uglifyjs ./dist/wscode.js -m -o ./dist/uglifyjs.new.js", function (error) {
                if (error) {
                    console.log(error);
                } else {

                    fs.writeFileSync("./dist/wscode.min.js", banner(pkg));
                    fs.appendFileSync("./dist/wscode.min.js", fs.readFileSync("./dist/uglifyjs.new.js"));

                    cuf.error('压缩完毕');
                }
                cuf.deleteSync("./dist/uglifyjs.new.js");
            });
        }

    }

};
