/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/// <reference path="../core/IContainer.ts"/>
/// <reference path="OverrideBase.ts"/>

module egret {

	/**
	 * @class egret.SetProperty
	 * @classdesc
	 * 设置属性
	 * @extends egret.OverrideBase
	 */	
	export class SetProperty extends OverrideBase{
		/**
		 * 构造函数
		 * @method egret.SetProperty#constructor
		 */		
		public constructor(){
			super();
		}
		
		/**
		 * 要修改的属性名
		 * @member egret.SetProperty#name
		 */		
		public name:string;
		
		/**
		 * 目标实例名
		 * @member egret.SetProperty#target
		 */		
		public target:string;
		
		/**
		 * 属性值 
		 * @member egret.SetProperty#value
		 */		
		public value:any;
		
		/**
		 * 旧的属性值 
		 */		
		private oldValue:any;
		
		/**
		 * @method egret.SetProperty#apply
		 * @param parent {IContainer} 
		 */
		public apply(parent:IContainer):void{   
			var obj:any = this.target==null||this.target==""?parent:parent[this.target];
			if(obj==null)
				return;
			this.oldValue = obj[this.name];
			this.setPropertyValue(obj, this.name, this.value, this.oldValue);
		}
		
		/**
		 * @method egret.SetProperty#remove
		 * @param parent {IContainer} 
		 */
		public remove(parent:IContainer):void{   
			var obj:any = this.target==null||this.target==""?parent:parent[this.target];
			if(obj==null)
				return;
			this.setPropertyValue(obj, this.name, this.oldValue, this.oldValue);
			this.oldValue = null;
		}
		
		/**
		 * 设置属性值
		 */		
		private setPropertyValue(obj:any, name:string, value:any,
										  valueForType:any):void{
			if (value === undefined || value === null)
				obj[name] = value;
			else if (typeof(valueForType) == "boolean")
				obj[name] = this.toBoolean(value);
			else
				obj[name] = value;
		}
		/**
		 * 转成Boolean值
		 */		
		private toBoolean(value:any):boolean{
			if (typeof(value) == "string")
				return value.toLowerCase() == "true";
			
			return value != false;
		}
	}
	
}