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
module ns_egret {

	export interface ISkinAdapter{
		/**
		 * 获取皮肤显示对象
		 * @param skinName 待解析的新皮肤标识符
		 * @param compFunc 解析完成回调函数，示例：compFunc(skin:Object,skinName:Object):void;
		 * 回调参数skin若为显示对象，将直接被添加到显示列表,其他对象根据项目自定义组件的具体规则解析。
		 * @param oldSkin 旧的皮肤显示对象,传入值有可能为null。对于某些类型素材，例如Bitmap，可以重用传入的显示对象,只修改其数据再返回。
		 */		
		getSkin(skinName:Object,compFunc:Function,oldSkin:DisplayObject=null):void;
	}
}