import React, {Component, PropTypes } from 'react';
import './AddressEdit.less'
import '../../style/base.less'

import LoadingSmall from '../Loading/LoadingSmall';
export default class AddressSelect extends Component {

	constructor(props,context){
		super(props,context);
		this.state = {
			province:'省',
			city: '市',
			district:'区',
			street:'街道（镇）',
			provinceCode:'',
			cityCode:'',
			districtCode:'',
			streetCode:'',
			showList:'province'
		}
	}

	componentWillReceiveProps(nextProps){
		const {user,getArea,dataProvince, showAreaSelect} = nextProps;
		if(showAreaSelect && !this.props.showAreaSelect && dataProvince.length == 0){
			//刚刚显示的时候获取省数据，code为1
			getArea(user.token,1,'province');
		}
	}

	handleTapItem(type){
		const {user,getArea,tipShowAndFade} = this.props;
		if(type == this.state.showList) return;
		let preType
		if(type == 'city'){
			preType = 'province';
		}else if(type == 'district'){
			preType = 'city';
		}else if(type == 'street'){
			preType = 'district';
		}else if(type == 'province'){
			preType = 'province';
		}

		if(!this.state[preType+'Code']) tipShowAndFade('请先选择上一级地区哦');
		this.setState({
			showList:type
		});
	}

	handleSelect(name,code){
		const {user,getArea,selectArea} = this.props;
		const type = this.state.showList;
		let nextType,nextTypeName;
		if(type == 'province'){
			nextType = 'city';
			nextTypeName = '市';
		}else if(type == 'city'){
			nextType = 'district';
			nextTypeName = '区';
		}else if(type == 'district'){
			nextType = 'street';
			nextTypeName = '街道（镇）';
		}
		this.setState({
			[type]:name,
			[nextType]:nextTypeName,
			[nextType+'Code']:'',
			[type+'Code']:code
		});
		
		selectArea(code,type);
		if(nextType) getArea(user.token,code,nextType);
	}

	renderItems(){
		const list = this.props['data'+this.state.showList.replace(/(\w)/,function(v){return v.toUpperCase()})];
	
		if(this.props.areaIsRequesting){
			return <li key ='loading' className= 'item_loading'><LoadingSmall/></li>
		}else{
			let listCom = [];
			list.map((item,index)=>{
				listCom.push(
					<span key = {index} className = {item.select?'item item_select':'item'} onClick = {()=>this.handleSelect(item.name,item.code)}>
						<span className = 'text'>{item.name}</span>
						<span className = 'icon icon-check2'></span>
					</span>
				);
			});
			return listCom;
		}
	}

	hideSelect(){
		this.resetData();
		this.props.hideAreaSelect();
	}

	resetData(){
		this.setState({
			province:'省',
			city: '市',
			district:'区',
			street:'街道（镇）',
			provinceCode:'',
			cityCode:'',
			districtCode:'',
			streetCode:'',
			showList:'province'
		});
		this.props.clearArea();
	}

	handleConfirm(){
		const {provinceCode,cityCode,districtCode,streetCode,province,city,district,street} = this.state;
		const {tipShowAndFade,dataDistrict,dataStreet} = this.props;
		if(!provinceCode){
			tipShowAndFade('请选择省级信息哦');
			return;
		}else if(!cityCode){
			tipShowAndFade('请选择市级信息哦');
			return;
		}else if(!districtCode && dataDistrict.length > 0){
			tipShowAndFade('请选择区级信息哦');
			return;
		}else if(!streetCode && dataStreet.length > 0){
			tipShowAndFade('请选择街道信息哦');
			return;
		}

		const pcdCode = provinceCode +' '+cityCode+ ' ' +districtCode + ' '+streetCode;
		const pcdName = province + ' ' + city + ' ' + district + ' ' +street;

		this.props.changeArea(pcdCode,pcdName);
		this.resetData();
		this.props.hideAreaSelect();
	}

	render(){
		return (
			<div className = {this.props.showAreaSelect?'addressSelect-wrapper addressSelect-wrapper_show':'addressSelect-wrapper'}>
				<span className = 'addressSelect-back icon icon-left' onClick = {this.hideSelect.bind(this)}></span>
				<div className = 'addressSelect'>
					<section className = {this.state.showList == 'province'?'addressSelect-item addressSelect-item_open':'addressSelect-item'}   >
						<header onClick = {()=>this.handleTapItem('province')} className = 'addressSelect-header'>
							<span className = 'text'>{this.state.province}</span>
							<span className = 'icon icon-down'></span>
						</header>
						<ul className = 'addressSelect-list'>
							{this.renderItems()}
						</ul>
					</section>
					<section className = {this.state.showList == 'city'?'addressSelect-item addressSelect-item_open':'addressSelect-item'} >
						<header onClick = {()=>this.handleTapItem('city')} className = 'addressSelect-header'>
							<span className = 'text'>{this.state.city}</span>
							<span className = 'icon icon-down'></span>
						</header>
						<ul className = 'addressSelect-list'>
							{this.renderItems()}
						</ul>
					</section>
					<section className = {this.state.showList == 'district'?'addressSelect-item addressSelect-item_open':'addressSelect-item'}>
						<header onClick = {()=>this.handleTapItem('district')} className = 'addressSelect-header'>
							<span className = 'text'>{this.state.district}</span>
							<span className = 'icon icon-down'></span>
						</header>
						<ul className = 'addressSelect-list'>
							{this.renderItems()}
						</ul>
					</section>
					<section className = {this.state.showList == 'street'?'addressSelect-item addressSelect-item_open':'addressSelect-item'} >
						<header onClick = {()=>this.handleTapItem('street')} className = 'addressSelect-header'>
							<span className = 'text'>{this.state.street}</span>
							<span className = 'icon icon-down'></span>
						</header>
						<ul className = 'addressSelect-list'>
							{this.renderItems()}
						</ul>
					</section>

				</div>
				<div className ='addressSelect-btn' onClick = {this.handleConfirm.bind(this)}>确定</div>

			</div>
		);
	}
}

AddressSelect.propTypes = {
	user:PropTypes.object.isRequired,
	getArea:PropTypes.func.isRequired,
	dataProvince:PropTypes.array.isRequired,
	dataStreet:PropTypes.array.isRequired,
	dataDistrict:PropTypes.array.isRequired, 
	selectArea:PropTypes.func.isRequired,
	dataCity:PropTypes.array.isRequired,
	tipShowAndFade:PropTypes.func.isRequired, 
	showAreaSelect:PropTypes.bool.isRequired,
	hideAreaSelect:PropTypes.func.isRequired,
	changeArea:PropTypes.func.isRequired,
	clearArea:PropTypes.func.isRequired
}

