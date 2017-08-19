import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loading from '../../components/Loading/Loading';
import Tip from '../../components/Tip/Tip';

import { getQs } from '../../actions/question';
import {tipShowAndFade} from '../../actions/tip';

import style from './style.less';

class Question extends Component{
    constructor(props, context){
        super(props,context);
        this.id = this.props.params.id;
    }

    componentWillMount(){
        if(!this.id){
            this.props.tipShowAndFade('参数错误，请关闭页面重新打开');
        }else{
            this.props.getQs();
        }
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
                <header className='qsCon-con-header'>
                    <div className='qsCon-icon'></div><p className='con'> {question?question.qsdetail.title:''}</p>
                </header>
                <div className = 'qs-con-con'>
                    <p dangerouslySetInnerHTML = {{__html:question?question.qsdetail.con:''}}></p>
                </div>
                <div className = 'qsCon-wenwenlogo'></div>
            </div>
        );
    }

}

Question.propTypes = {
   question : PropTypes.object.isRequired,
   tip:PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return {
        question: state.question,
        tip: state.tip
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getQs: bindActionCreators(getQs, dispatch),
       	tipShowAndFade: bindActionCreators(tipShowAndFade,dispatch)
    }
}
    
export default connect(mapStateToProps, mapDispatchToProps)(Question);