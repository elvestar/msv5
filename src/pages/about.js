
import React from 'react'
import { Link } from 'react-router'

import sortBy from 'lodash/sortBy'

import Utils from '../utils/utils'


export default class AboutPage extends React.Component {
    render() {
        return (
            <div className="about">
                <div className="row">
                    <div className="col-md-9">
                        <h4>关于</h4>
                        <p>
                            我的姓名的来源于是春秋战国时的人物：管<strong>仲</strong>、乐<strong>毅</strong>。我的职业是程序员，我居住在北京。
                        </p>
                        <p>
                            我从2012年2月15开始至今一直在百度工作，工作方向是大数据平台和分布式系统，对Web开发也一直关注。
                            主要工作语言是C++、Python和Javascript。
                        </p>
                        <p>
                            工作之外，我对如何改造自己和改造世界很感兴趣。我在时间管理和个人知识管理上面作了一些实践。我在其他方面也做过很多摸索。
                            我觉得当前人类还有很多不完善的地方，需要寻找工具甚至是自己开发工具来让自己得以进化。
                        </p>
                        <p>
                            生活上，我会花费时间来阅读、登山、跑步、摄影、听各种风味的音乐。为了提升自己的音乐鉴赏力，我略微学习了弹奏吉他和钢琴。
                        </p>
                        <p>
                            本网站域名是elvestar.com。elvestar这个单词是我生造的，elves是奇幻文化里的精灵，star是星辰。
                        </p>
                    </div>
                    <div className="col-md-3">
                    </div>
                </div>
            </div>
        )
    }
}