/**
 * Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
 * to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/// <reference path="../context/net/NetContext.ts"/>
/// <reference path="../core/MainContext.ts"/>
/// <reference path="../events/EventDispatcher.ts"/>
/// <reference path="../resource/ResourceLoader.ts"/>
/// <reference path="../utils/callLater.ts"/>

module ns_egret {


    export class URLLoader extends EventDispatcher {


        state:number = ResourceLoader.LOAD_STATE_INIT;
        data = null;
        onLoadComplete:Function;
        fixedUrl:string = null;

        preFixUrl:string = "";

        constructor(public url:string,public type:string) {
            super();
        }

        public load():void {
            switch (this.state) {
                case ResourceLoader.LOAD_STATE_INIT:
                    this.startLoading();
                    break;
                case ResourceLoader.LOAD_STATE_LOADED:
                    ns_egret.callLater(this._executeAllCallback, this);
                    break;
            }
        }

        private startLoading() {
            var request = new ns_egret.URLRequest(this.url, this._executeAllCallback, this);
            request.type = this.type;
            if (this.preFixUrl == "") {
                request.prefix = ResourceLoader.prefix;
            }
            else {
                request.prefix = this.preFixUrl;
            }
            MainContext.instance.netContext.send(request);
        }

        private _executeAllCallback(data) {
            switch (this.type) {
                case ResourceLoader.DATA_TYPE_IMAGE:
                    TextureCache.getInstance().addTexture(this.url, data);
                    break;
                case ResourceLoader.DATA_TYPE_TEXT:
                    TextureCache.getInstance().addTextData(this.url, data);
                    break;
            }

            this.state = ResourceLoader.LOAD_STATE_LOADED;
            if (data) {
                this.data = data;
            }
            if (this.onLoadComplete) {
                this.onLoadComplete(this.data);
            }
            this.dispatchEventWith(ResourceLoader.LOAD_COMPLETE, false, this.data);
        }

        public static LOAD_COMPLETE = "resource_load_complete";

        /**
         * 二进制数据
         */
        public static DATA_TYPE_BINARY = "binary";
        /**
         * 文本数据
         */
        public static DATA_TYPE_TEXT = "text";
        /**
         * 图片数据
         */
        public static DATA_TYPE_IMAGE = "image";

        /**
         * 加载状态：未开始
         */
        public static LOAD_STATE_INIT = 0;
        /**
         * 加载状态：已完成
         */
        public static LOAD_STATE_LOADED = 1;

        private static __pool = {};
        /**
         * 资源加载前缀
         */
        public static prefix:string = "";

//        public static create(src:string, type:string = "") {
//            if (ResourceLoader.__pool[src] == null) {
//                var ext:string = src.substring(src.lastIndexOf(".") + 1);
//                var handlerClass = ResourceLoader.__registerMap[ext];
//                if (!handlerClass) {
//                    handlerClass = ns_egret.ResourceLoader;
//                }
//                ResourceLoader.__pool[src] = new handlerClass(src, type);
//            }
//            return ResourceLoader.__pool[src];
//        }
//
//        private static __registerMap = {};
//
//        public static registerHandler(ext:string, handlerClass:Function) {
//            ResourceLoader.__registerMap[ext] = handlerClass;
//        }


    }


}