import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router'


import Loading from '../../components/Loading/Loading';
import Tip from '../../components/Tip/Tip';
import Search from '../../components/Search/Search';
import { getQsList } from '../../actions/question';

import style from './style.less';

class Question extends Component{
    constructor(props, context){
        super(props,context);
        this.state = {
            filter:''
        }
    }

    componentWillMount(){
        this.props.getQsList();
    }

    showQs(id){
        hashHistory.push('/qs/'+id);
    }

    renderList(){
        let list = [];
        this.props.question.list.map((item,index)=>{
            if(!this.state.filter || item.title.indexOf(this.state.filter) !== -1){
                list.push(<section  key = {index} className='item' onClick = {() => this.showQs(item._id).bind(this)}>
                    <div className='qsCon-icon icon'></div>
                    <p  className='item-text'>{item.title}</p>
                    <div className='icon icon-jiantou'></div>
                </section>);
            }
        });
        return list;
    }

    filter(key){
        this.setState({
            filter:key
        })
    }

    render(){
        let loadingComponent;
        const {question, tip} = this.props;
        if(question.isRequesting) {
			loadingComponent = <Loading />;
		}
        return (
            <div className = 'qsCon-wrapper'>
                {loadingComponent}
                <Tip text = {tip.text} showTip = {tip.showTip} />
                <Search filter = {this.filter.bind(this)} placeholder = '请输入关键字'/>
                
                <div className = 'qsCon-list'>
                    {this.renderList()}
                </div>
                <div className = 'qsCon-tip'>
                    <div className = 'qsCon-tip-con'>
                        若找不到想问的问题，请拨打客服：
                        <div className = 'qsCon-tip-tel'>
                        <p>学校：<a className='tel' href='tel:15757178722'>15757178722</a></p>
                        <p>小区：<a className='tel' href='tel:18969034554'>18969034554</a></p>
                        </div>
                    </div>
                </div>
                <div className = 'qsCon-wenwenlogo'></div>
            </div>
        );
    }

}

Question.propTypes = {
   question : PropTypes.object.isRequired,
   tip:PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    return {
        question: state.question,
        tip: state.tip
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getQsList: bindActionCreators(getQsList, dispatch)
    }
}
    
export default connect(mapStateToProps, mapDispatchToProps)(Question);