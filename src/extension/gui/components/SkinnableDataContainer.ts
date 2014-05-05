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

/// <reference path="../collections/ICollection.ts"/>
/// <reference path="../core/IVisualElement.ts"/>
/// <reference path="../events/RendererExistenceEvent.ts"/>
/// <reference path="../layouts/VerticalLayout.ts"/>
/// <reference path="../layouts/supportClasses/LayoutBase.ts"/>

module ns_egret {

	export class SkinnableDataContainer extends SkinnableComponent implements IItemRendererOwner{
		/**
		 * 构造函数
		 */		
		public constructor(){
			super();
		}
		
		/**
		 * @inheritDoc
		 */
		public get hostComponentKey():any{
			return SkinnableDataContainer;
		}
		/**
		 * @inheritDoc
		 */
		public updateRenderer(renderer:IItemRenderer, itemIndex:number, data:any):IItemRenderer{
			if(renderer is IVisualElement){
				(<IVisualElement> renderer).ownerChanged(this);
			}
			renderer.itemIndex = itemIndex;
			renderer.label = this.itemToLabel(data);
			renderer.data = data;
			return renderer;
		}
		
		/**
		 * 返回可在项呈示器中显示的 String 
		 */		
		public itemToLabel(item:any):string{
			if (item !== null)
				return item.toString();
			else return " ";
		}
		
		/**
		 * [SkinPart]数据项目容器实体
		 */		
		public dataGroup:DataGroup;
		/**
		 * dataGroup发生改变时传递的参数 
		 */		
		public _dataGroupProperties:any = {};
		
		/**
		 * 列表数据源，请使用实现了ICollection接口的数据类型，例如ArrayCollection
		 */		
		public get dataProvider():ICollection{
            return this.dataGroup!=null
                ? this.dataGroup.dataProvider
                : this._dataGroupProperties.dataProvider;
		}

		public set dataProvider(value:ICollection){
			this._setDataProvider(value);
		}

        public _setDataProvider(value:ICollection):void{
            if (this.dataGroup==null){
                this._dataGroupProperties.dataProvider = value;
            }
            else{
                this.dataGroup.dataProvider = value;
                this._dataGroupProperties.dataProvider = true;
            }
        }
		
		/**
		 * 用于数据项目的项呈示器。该类必须实现 IItemRenderer 接口。 <br/>
		 * rendererClass获取顺序：itemRendererFunction > itemRenderer > 默认ItemRenerer。
		 */		
		public get itemRenderer():any{
			return (this.dataGroup) 
			? this.dataGroup.itemRenderer 
				: this._dataGroupProperties.itemRenderer;
		}
		
		public set itemRenderer(value:any){
			if (this.dataGroup==null){
				this._dataGroupProperties.itemRenderer = value;
			}
			else{
				this.dataGroup.itemRenderer = value;
				this._dataGroupProperties.itemRenderer = true;
			}
		}
		
		/**
		 * 条目渲染器的可选皮肤标识符。在实例化itemRenderer时，若其内部没有设置过skinName,则将此属性的值赋值给它的skinName。
		 * 注意:若itemRenderer不是ISkinnableClient，则此属性无效。
		 */	
		public get itemRendererSkinName():any{
			return (this.dataGroup) 
			? this.dataGroup.itemRendererSkinName 
				: this._dataGroupProperties.itemRendererSkinName;
		}
		
		public set itemRendererSkinName(value:any){
			if (this.dataGroup==null){
				this._dataGroupProperties.itemRendererSkinName = value;
			}
			else{
				this.dataGroup.itemRendererSkinName = value;
				this._dataGroupProperties.itemRendererSkinName = true;
			}
		}
		
		/**
		 * 为某个特定项目返回一个项呈示器Class的函数。 <br/>
		 * rendererClass获取顺序：itemRendererFunction > itemRenderer > 默认ItemRenerer。 <br/>
		 * 应该定义一个与此示例函数类似的呈示器函数： <br/>
		 * function myItemRendererFunction(item:Object):Class
		 */		
		public get itemRendererFunction():Function{
			return (this.dataGroup) 
			? this.dataGroup.itemRendererFunction 
				: this._dataGroupProperties.itemRendererFunction;
		}
		
		public set itemRendererFunction(value:Function){
			if (this.dataGroup==null){
				this._dataGroupProperties.itemRendererFunction = value;
			}
			else{
				this.dataGroup.itemRendererFunction = value;
				this._dataGroupProperties.itemRendererFunction = true;
			}
		}
		
		/**
		 * 布局对象
		 */	
		public get layout():LayoutBase{
			return (this.dataGroup) 
			? this.dataGroup.layout 
				: this._dataGroupProperties.layout;
		}
		
		public set layout(value:LayoutBase){
			this._setLayout(value);
		}

        public _setLayout(value:LayoutBase):void{
            if (this.dataGroup==null){
                this._dataGroupProperties.layout = value;
            }
            else{
                this.dataGroup.layout = value;
                this._dataGroupProperties.layout = true;
            }
        }
		
		/**
		 * @inheritDoc
		 */
		public partAdded(partName:string, instance:any):void{
			super.partAdded(partName, instance);
			
			if (instance == this.dataGroup){
				var newDataGroupProperties:any = {};
				
				if (this._dataGroupProperties.layout !== undefined){
					this.dataGroup.layout = this._dataGroupProperties.layout;
					newDataGroupProperties.layout = true;
				}
				
				if (this._dataGroupProperties.dataProvider !== undefined){
					this.dataGroup.dataProvider = this._dataGroupProperties.dataProvider;
					newDataGroupProperties.dataProvider = true;
				}
				
				if (this._dataGroupProperties.itemRenderer !== undefined){
					this.dataGroup.itemRenderer = this._dataGroupProperties.itemRenderer;
					newDataGroupProperties.itemRenderer = true;
				}
				
				if (this._dataGroupProperties.itemRendererSkinName !== undefined){
					this.dataGroup.itemRendererSkinName = this._dataGroupProperties.itemRendererSkinName;
					newDataGroupProperties.itemRendererSkinName = true;
				}
				
				if (this._dataGroupProperties.itemRendererFunction !== undefined){
					this.dataGroup.itemRendererFunction = this._dataGroupProperties.itemRendererFunction;
					newDataGroupProperties.itemRendererFunction = true;
				}
				this.dataGroup.rendererOwner = this;
				this._dataGroupProperties = newDataGroupProperties;
				
				if (this.hasEventListener(RendererExistenceEvent.RENDERER_ADD)){
					this.dataGroup.addEventListener(
						RendererExistenceEvent.RENDERER_ADD, this.dispatchEvent, this);
				}
				
				if (this.hasEventListener(RendererExistenceEvent.RENDERER_REMOVE)){
					this.dataGroup.addEventListener(
						RendererExistenceEvent.RENDERER_REMOVE, this.dispatchEvent, this);
				}
			}
		}
		
		/**
		 * @inheritDoc
		 */
		public partRemoved(partName:string, instance:any):void{
			super.partRemoved(partName, instance);
			
			if (instance == this.dataGroup){
				this.dataGroup.removeEventListener(
					RendererExistenceEvent.RENDERER_ADD, this.dispatchEvent, this);
				this.dataGroup.removeEventListener(
					RendererExistenceEvent.RENDERER_REMOVE, this.dispatchEvent, this);
				var newDataGroupProperties:any = {};
				if(this._dataGroupProperties.layout)
					newDataGroupProperties.layout = this.dataGroup.layout;
				if(this._dataGroupProperties.dataProvider)
					newDataGroupProperties.dataProvider = this.dataGroup.dataProvider;
				if(this._dataGroupProperties.itemRenderer)
					newDataGroupProperties.itemRenderer = this.dataGroup.itemRenderer;
				if(this._dataGroupProperties.itemRendererSkinName)
					newDataGroupProperties.itemRendererSkinName = this.dataGroup.itemRendererSkinName;
				if(this._dataGroupProperties.itemRendererFunction)
					newDataGroupProperties.itemRendererFunction = this.dataGroup.itemRendererFunction;
				this._dataGroupProperties = newDataGroupProperties
				this.dataGroup.rendererOwner = null;
				this.dataGroup.dataProvider = null;
				this.dataGroup.layout = null;
			}
		}
		
		/**
		 * @inheritDoc
		 */
		public addEventListener(
			type:string, listener:Function, useCapture:boolean=false, priority:number=0, useWeakReference:boolean=false) : void{
			super.addEventListener(type, listener,this, useCapture, priority, useWeakReference);
			
			if (type == RendererExistenceEvent.RENDERER_ADD && this.dataGroup){
				this.dataGroup.addEventListener(
					RendererExistenceEvent.RENDERER_ADD, this.dispatchEvent, this);
			}
			
			if (type == RendererExistenceEvent.RENDERER_REMOVE && this.dataGroup){
				this.dataGroup.addEventListener(
					RendererExistenceEvent.RENDERER_REMOVE, this.dispatchEvent, this);
			}
		}
		
		/**
		 * @inheritDoc
		 */
		public removeEventListener(type:string, listener:Function, useCapture:boolean=false) : void{
			super.removeEventListener(type, listener,this, useCapture);
			
			if (type == RendererExistenceEvent.RENDERER_ADD && this.dataGroup){
				if (!this.hasEventListener(RendererExistenceEvent.RENDERER_ADD)){
					this.dataGroup.removeEventListener(
						RendererExistenceEvent.RENDERER_ADD, this.dispatchEvent, this);
				}
			}
			
			if (type == RendererExistenceEvent.RENDERER_REMOVE && this.dataGroup){
				if (!this.hasEventListener(RendererExistenceEvent.RENDERER_REMOVE)){
					this.dataGroup.removeEventListener(
						RendererExistenceEvent.RENDERER_REMOVE, this.dispatchEvent, this);
				}
			}
		}
		
		/**
		 * @inheritDoc
		 */
		public createSkinParts():void{
			this.dataGroup = new DataGroup();
			this.dataGroup.percentHeight = this.dataGroup.percentWidth = 100;
			this.dataGroup.clipAndEnableScrolling = true;
			var temp:VerticalLayout = new VerticalLayout();
			this.dataGroup.layout = temp;
			temp.gap = 0;
			temp.horizontalAlign = "contentJustify";
			this.addToDisplayList(this.dataGroup);
			this.partAdded("dataGroup",this.dataGroup);
		}
		
		/**
		 * @inheritDoc
		 */
		public removeSkinParts():void{
			if(!this.dataGroup)
				return;
			this.partRemoved("dataGroup",this.dataGroup);
			this.removeFromDisplayList(this.dataGroup);
			this.dataGroup = null;
		}
	}
}