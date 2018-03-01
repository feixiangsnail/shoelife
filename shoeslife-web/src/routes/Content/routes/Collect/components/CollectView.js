import React, {Component, PropTypes} from 'react';
import Image from 'components/Image';
import ImageSlider from 'components/ImageSlider';
import {H5_URL, IMG_URL} from 'static/apiAlias';
import {message, Input, Button, Icon, Modal, Popconfirm} from 'antd';
import ChooseView from './ChooseView'
import SortView from './SortView'
import classes from './style.less';
import close from './false.png'
class Collect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTitle: null,
      isAddM: false,
      visible: false,
      visibleSort: false,
      indexId: null,
      // 是否显示图片预览modal
      previewVisible: false,
      // 要预览的图片
      previewImages: [],
    }
  }

  /**
   * 隐藏图片预览
   */
  cancelPreview = () => {
    this.setState({previewVisible: false});
  };

  /**
   * 点击图片时显示幻灯片
   * @param text
   */
  onClickImage(text) {
    console.log(text)
    let newImageArray = [];
    if (typeof(text) === 'string' || text instanceof String && text.length > 0) {
      newImageArray = text.split(',') && text.split(',').length&&text.split(',').map((k)=>{
          return {url: IMG_URL + k, alt: ''}
        })
    }
    // 如果没有图片, 点击就不要显示modal
    if (newImageArray.length > 0) {
      this.setState({previewVisible: true, previewImages: newImageArray});
    }
  }

  /**
   * 鞋列表弹出层
   * @param id
   */
  showModal(id) {
    const context = this;
    const {isGet} = context.props;
    context.setState({
      visible: true,
      indexId: id
    });
    isGet()
  }

  /**
   * 排序弹出层
   */
  showSortModal() {
    const context = this;
    const {isGetSortList} = context.props;
    context.setState({
      visibleSort: true,
    });
    isGetSortList()
  }

  /**
   * 弹出层确认
   */
  handleOk() {
    const context = this;
    const {isOK, selectList} = context.props, {indexId} = context.state;
    context.setState({
      visible: false
    });
    isOK(selectList, indexId);
  }

  /**
   * 排序弹出层确认
   */
  handleOkSort() {
    const context = this;
    const {isOKSort, item} = context.props;
    context.setState({
      visibleSort: false
    });
    isOKSort(item)
  }

  /***
   * 弹出层取消
   */
  handleCancel() {
    this.setState({
      visible: false
    });
  }

  /**
   * 排序弹出层取消按钮
   */
  handleCancelSort() {
    this.setState({
      visibleSort: false
    });
  }

  /**
   * 删除图片
   * @param sId 当前鞋款ID
   * @param row 当前鞋款合集对象
   */
  delImg(sId, row) {
    const {item, toDelImg} = this.props;
    let filterIds = item && item.length && item.filter((tab) => {
        return tab.id == row.id
      })[0].shoeInfos.filter((t) => {
        return t.shoeId != sId
      }).map((d) => {
        return d.shoeId
      })
    toDelImg(filterIds, row)
  }

  /**
   * 删除单行合集
   * @param row
   * @private
   */
  _del(row) {
    const {toDel} = this.props;
    toDel(row)
  }

  /**
   * 发布
   * @param row
   * @private
   */
  _release(row) {
    const {toRelease} = this.props;
    toRelease(row);
  }

  /**
   * 新增快捷按钮
   */
  adds() {
    this.setState({
      isAddM: true,
    })
  }

  /**
   * 编辑ICON
   * @param row
   */
  edit(row) {
    row.is = true;
    this.forceUpdate()
  }

  /**
   * 提交-新增/编辑文本框
   * @param row
   */
  isSubm(row) {
    const {newTitle} = this.state;
    const {isSubm, isP} = this.props;
    isSubm(newTitle, row)
    row.is = true;
  }

  /**
   * 取消-新增/编辑文本框
   * @param row
   */
  isReSet(row) {
    this.setState({
      isAddM: false,
    })
    row.is = false
  }

  render() {
    const context = this;
    let {isAddM} = context.state;
    const {chooseTableOptions, sortTableOptions, shoeList, chooseFormOption, selectList, rowKeys, tabDataAddSource, item, addResult} = context.props;
    if (addResult.isP) {
      this.setState({isAddM: false});
      addResult.isP = false;
    }
    return (
      <div className={classes.collect}>
        <div className={classes.addBtn}>
          <Button type="primary" onClick={context.showSortModal.bind(context)}>调整顺序</Button>&nbsp; &nbsp; &nbsp; &nbsp;
          <Button type="primary" disabled={isAddM} onClick={context.adds.bind(context)}><Icon type="plus"/> 合集</Button>
        </div>
        <Modal visible={this.state.visibleSort}
               width={800} closable={false}
               onOk={this.handleOkSort.bind(this)} onCancel={this.handleCancelSort.bind(this)}>
          <SortView sortTableOptions={sortTableOptions} item={item}/>
        </Modal>
        {
          isAddM ? <div className={classes.addModal}>
            <dl>
              <dt className="clearfix">
                <div className={classes.title} style={{width: '50%'}}>
                  <Input name='name' style={{width: '62%'}} onChange={(e) => {
                    if (e.target.value.length > 10) {
                      message.warning('请输入10个字以内');
                      return false
                    }
                    context.setState({
                      newTitle: e.target.value
                    })
                  }}/> &nbsp; &nbsp;
                  <Icon type="check" style={{color: '#2db7f5', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer'}}
                        onClick={context.isSubm.bind(context)}/>
                  &nbsp; &nbsp; &nbsp; &nbsp;
                  <Icon type="cross" style={{color: '#2db7f5', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer'}}
                        onClick={context.isReSet.bind(context)}/>
                </div>
              </dt>
              <dd>
                {
                  tabDataAddSource && tabDataAddSource.length ? tabDataAddSource.map((t) => {
                    return t.coverPhoto && t.coverPhoto.split(',') && t.coverPhoto.split(',').length ? <span className={classes.pic}>
                        <Image src={ t.coverPhoto.split(',')[0] + '?x-oss-process=image/resize,h_100,w_100'}
                               onClick={context.onClickImage.bind(context, t.coverPhoto)}/></span> : ''
                  }) : ''
                }
                {
                  tabDataAddSource && tabDataAddSource.length > 10 ? '' :
                    <span className={classes.addMore} onClick={context.showModal.bind(context, null)}>添加鞋款</span>
                }
              </dd>
            </dl>
          </div> : ''
        }
        <Modal visible={this.state.visible}
               width={1366}
               onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
          <ChooseView shoeList={shoeList} selectList={selectList} chooseTableOptions={chooseTableOptions} chooseFormOption={chooseFormOption}/>
        </Modal>
        {
          item && item.length > 0 ? item.map((i) => {
            return <dl key={i.id}>
              <dt className="clearfix">

                {
                  !i.is ? <div className={classes.title}><span>{i.name}</span><Icon type="edit" onClick={context.edit.bind(context, i)}/></div> :
                    <div className={classes.title} style={{width: '50%'}}>
                      <Input name='name' defaultValue={i.name} style={{width: '62%'}} onChange={(e) => {
                        context.setState({
                          newTitle: e.target.value
                        })
                      }}/> &nbsp; &nbsp;
                      <Icon type="check" style={{color: '#2db7f5', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer'}}
                            onClick={context.isSubm.bind(context, i)}/>
                      &nbsp; &nbsp; &nbsp; &nbsp;
                      <Icon type="cross" style={{color: '#2db7f5', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer'}}
                            onClick={context.isReSet.bind(context, i)}/>
                    </div>
                }
                <div className={classes.operate}>
                  {
                    i.status == 'UNPUBLISHED' ?
                      <Popconfirm title="是否发布该合集？" onConfirm={context._release.bind(context, i)}><span>发布上线</span></Popconfirm> : ''
                  }
                  <Popconfirm title="是否删除该合集？" onConfirm={context._del.bind(context, i)}><span>删除</span></Popconfirm>
                </div>
              </dt>
              <dd>
                {
                  i.shoeInfos && i.shoeInfos.length > 0 ? i.shoeInfos.map((s) => {
                    let arr = s.coverPhoto.split(',')
                    arr.pop()
                    return <div key={s.shoeId} className={classes.pic}>
                      {
                        i.status == 'UNPUBLISHED' ?
                          <Popconfirm title="是否删除该鞋款？" onConfirm={this.delImg.bind(this, s.shoeId, i)}>
                            <img className={classes.close} src={close}/>
                          </Popconfirm> : ''
                      }

                      <Image src={ arr[0] + '?x-oss-process=image/resize,h_100,w_100'}
                             onClick={context.onClickImage.bind(context, s.coverPhoto)}/>
                    </div>
                  }) : ''
                }
                {
                  i.shoeInfos ? i.shoeInfos.length < 10 ?
                    <span className={classes.addMore} onClick={context.showModal.bind(context, i)}>添加鞋款</span> : '' :
                    <span className={classes.addMore} onClick={context.showModal.bind(context, i)}>添加鞋款</span>
                }
              </dd>
            </dl>
          }) : ''
        }
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.cancelPreview}>
          <ImageSlider items={this.state.previewImages}/>
        </Modal>
      </div>
    )
  }
}

Collect.propTypes = {}

export default Collect;
