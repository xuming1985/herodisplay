namespace GameDisplay.Domain
{
    public enum BRole
    {
        //管理员
        Administrator,

        //项目经理
        //查看bug相关数据的可视化分析
        Manager,

        //产品负责人
        //1、当开发和测试存在意见分歧时，进行需求确认
        //2、从产品角度划分bug修改的优先级；
        ProductOwner,

        //开发主管
        //1. 定期 review bug，对bug多的模块加强code review和单元测试；
        //2. 分析bug解决进度，对产品质量及进度进行风险评估；
        Developer_TL,

        //开发人员
        //1. 以优先级为依据分析解决bug
        Developer,

        //测试主管
        //1. 审核测试工程师提交的bug；
        //2. 定期review bug，报告现状，并给出解决意见；
        Tester_TL,

        //测试人员
        //1. 根据规范提交bug；
        //2. 及时验证bug是否已解决；
        //3. 及时关注开发拒绝bug，和相关人员沟通讨论解决方式；
        Tester,
    }
}
