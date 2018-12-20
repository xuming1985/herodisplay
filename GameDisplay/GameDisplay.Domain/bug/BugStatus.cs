using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameDisplay.Domain.bug
{
    public enum BugStatus
    {
        //草稿
        Draft,

        //新建
        New,

        //解决中
        InSolve,

        //已解决
        Solved,

        //拒绝的
        Reject,

        //完成
        Finish,

    }
}
