import React, {Component,PropTypes} from 'react';
import AddressSelect from './AddressSelect';
import { hashHistory } from 'react-router'

import './AddressEdit.less'
export default class AddressEdit extends Component {
	constructor(props,context){
		super(props,context);
		this.state = {
			name:'',
			phone:'',
			pcdName:'',
			pcdCode:'',
			detailAddress:'',
			isDefault:'0',
			showAreaSelect:false
		}
			
	}

	componentDidMount(){
		this.setAddressState(this.props.addressData);
		// console.log(this.props.addressData);
	}

	componentWillReceiveProps(nextProps){
		const {addressData} = nextProps;
		this.setAddressState(addressData);
	}


	setAddressState(addressData){
		if(addressData){
			 this.setState({
				name: addressData.name,
				phone: addressData.phone,
				pcdName: addressData.pcdName,
				pcdCode: addressData.pcdCode,
				detailAddress:addressData.detailAddress,
				isDefault: addressData.isDefault
			});
		}
	}

	
	handleChange(e,key){
		this.setState({
			[key]:e.target.value.trim()
		})
	}

	handleClear(key){
		this.setState({
			[key]:''
		});
	}

	setDefault(){
		this.setState({
			isDefault:(this.state.isDefault == '1')?'0':'1'
		});
	}

	handleDel(){
		this.props.deleteAddr(this.props.user.token,this.props.addressData.addressId,() => {
			hashHistory.push('/'+this.props.type);
		});
	}

	handleSet(){
		const {user, editAddr,addressData,type,tipShowAndFade} = this.props;
		if(!this.state.name){
			tipShowAndFade('请填写姓名哦');
			return;
		} else if(!/^1[3-9]\d{9}$/.test(this.state.phone)){
			tipShowAndFade('请填写正确的手机号码哦');
			return;
		} else if(!this.state.pcdName){
			tipShowAndFade('请选择地址哦');
			return;
		} else if(!this.state.detailAddress){
			tipShowAndFade('请填写详细地址哦');
			return;
		}
		let data = Object.assign({},this.state);
		data.addressId = addressData? addressData.addressId : null;
		data.type = type;
		this.props.editAddr(user.token, data,function(){
			hashHistory.push('/'+ type);
		});
	}

	showAreaSelect(){
		this.setState({
			showAreaSelect:true
		});
	}

	hideAreaSelect(e){
		e.preventDefault();
		this.setState({
			showAreaSelect:false
		});
	}

	changeArea(pcdCode,pcdName){
		this.setState({
			pcdName:pcdName,
			pcdCode:pcdCode
		});
	}

	render(){
		const {user,addressData,dataProvince,dataCity,dataDistrict,dataStreet,tipShowAndFade,getArea,selectArea,clearArea,areaIsRequesting} = this.props;

		return (
			<div className = 'addressEdit-wrapper'>
				<form className = 'addressEdit-form'>
					<section className = 'addressEdit-user'>
						<div className = 'addressEdit-inputWraaper'>
							<span className ='icon icon-user'></span>
							<input type = 'text' className = 'addressEdit-input' placeholder = '*请填写姓名' value = {this.state.name} onChange = {(e)=> this.handleChange(e,'name')}/>
							{this.state.name?<span className = 'icon icon-close' onClick = {(e) => {this.handleClear('name')}}></span>:''}
							
						</div>
						<div className = 'addressEdit-inputWraaper'>
							<span className ='icon icon-tel'></span>
							<input type = 'number' className = 'addressEdit-input' placeholder = '*请填写电话号码' value = {this.state.phone} onChange = {(e)=> this.handleChange(e,'phone')}/>
							{this.state.phone?<span className = 'icon icon-close' onClick = {(e) => {this.handleClear('phone')}}></span>:''}
						</div>
					</section>

					<section className = 'addressEdit-addr'>
						<div className = 'addressEdit-inputWraaper' onClick = {this.showAreaSelect.bind(this)}>
							<span className ='icon icon-location'></span>
							<span className = 'addressEdit-text'>{this.state.pcdName||'*省市区（街道)'}</span>
							<span className = 'icon icon-jiantou'></span>
						</div>
						<div className = 'addressEdit-inputWraaper'>
							<span className ='icon icon-location'></span>
							<input type = 'text' className = 'addressEdit-input' placeholder = '*请填写详细地址' value = {this.state.detailAddress} onChange = {(e)=> this.handleChange(e,'detailAddress')}/>
							{this.state.detailAddress?<span className = 'icon icon-close' onClick = {(e) => {this.handleClear('detailAddress')}}></span>:''}
						</div>
						<div className = 'addressEdit-inputWraaper addressEdit-default'>
							<span className = 'addressEdit-text'>设置为默认地址</span>
							<div className = {(this.state.isDefault=='1')?'addressEdit-toggle addressEdit-toggle_active':'addressEdit-toggle'} onClick = {this.setDefault.bind(this)}><span className = 'dot'></span></div>
						</div>
					</section>

					<section className = 'addressEdit-btnw'>
						<div className = 'addressEdit-btn addressEdit-btn_add' onClick = {this.handleSet.bind(this)}>{!!addressData?'修改地址':'添加地址'}</div>

						{
							!!addressData?<div onClick = {this.handleDel.bind(this)} className = 'addressEdit-btn addressEdit-btn_delete'>删除地址</div> :''
						}
					</section>
				</form>
				<AddressSelect 
					user = {user}
					getArea = {getArea}
					dataProvince = {dataProvince} 
					dataStreet = {dataStreet}
					dataDistrict = {dataDistrict}
					selectArea = {selectArea}
					dataCity = {dataCity}
					tipShowAndFade = {tipShowAndFade}
					showAreaSelect = {this.state.showAreaSelect}
					hideAreaSelect = {this.hideAreaSelect.bind(this)}
					areaIsRequesting = {areaIsRequesting}
					changeArea = {this.changeArea.bind(this)}
					clearArea = {clearArea}/>
			</div>
			);
	}
}

AddressEdit.propTypes = {
	deleteAddr:PropTypes.func.isRequired,
	editAddr:PropTypes.func.isRequired, 
	getArea:PropTypes.func.isRequired, 
	clearArea:PropTypes.func.isRequired, 
	selectArea:PropTypes.func.isRequired, 
	tipShowAndFade:PropTypes.func.isRequired,
	type:PropTypes.string.isRequired, 
	user:PropTypes.object.isRequired, 
	dataProvince:PropTypes.array.isRequired, 
	dataCity:PropTypes.array.isRequired, 
	dataDistrict:PropTypes.array.isRequired, 
	dataStreet:PropTypes.array.isRequired, 
	areaIsRequesting:PropTypes.bool.isRequired
}