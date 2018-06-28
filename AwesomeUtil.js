/*
 * @Author: The-Zi
 * @Date: 2018-06-28 10:53:06
 * @Last Modified by: The-Zi
 * @Last Modified time: 2018-06-28 16:04:09
 */


class AwesomeUtil {
    //防止页面后退
    // 消除 后退的所有动作。包括 键盘、鼠标手势等产生的后退动作。
    stopPushState() {
        if (window && window.history) {
            window.history.pushState(null, null, document.URL);
            window.addEventListener('popstate', () => {
                history.pushState(null, null, document.URL);
                this.cancelBtn();
            });
        }
    }

    // 清空字符串中的空格
    trim(params) {
        // 清除字符串两端空格，包含换行符、制表符
        let resutl = params.str.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "");

        if (params.range && params.range === "all") {
            // 去除中间的空格，包含换行符、制表符
            return resutl.replace(/\s\n\t/g, "")
        } else {
            // 去除中间的空格，包含换行符、制表符
            return resutl
        }
    }

    // 计算对象属性个数
    objectCount(params) {
        let queryNum = 0;

        if (typeof params === "object") {
            for (const key in processTask) {
                if (processTask.hasOwnProperty(key)) {
                    queryNum++;
                }
            }
        }

        return queryNum
    }

    // 检查邮箱格式
    // 返回值：Boolean
    // 参数：email(必须，一个字符串)，keyWord(可选，一个字符串)
    // 说明：默认情况下只允许输入：字母、数字、_、@、.
    // 如果希望可以输入其他字符、可以通过第二个参数设置
    checkEmail(email, keyWord) {
        // 判断email参数是否是字符串，只有是字符串时才会执行
        if (typeof email === "string") {
            // 检查是否包含有邮箱的必要字符
            let match1 = email.match(/@/g);
            let match2 = email.match(/\./g);

            // 将keyWord参数添加进，邮箱地址允许使用的字符中
            if (keyWord == null) {
                let patt = "([^\\d\\w\\.]|\\.{2,}|^(\\.|_)|(\\.|_)$)";
            } else if (typeof keyWord === "string" && keyWord !== "@") {
                let patt = "([^\\d\\w\\." + keyWord + "]|\\.{2,}|^(\\.|_|" + keyWord + ")|(\\.|_|" + keyWord + ")$)";
            }

            // 用于检查邮箱名称部分的正则表达式
            let patt1 = new RegExp(patt);

            // 用于检查邮箱域名部分的正则表达式
            let patt2 = /([^0-9a-zA-Z\.]|\.{2,}|^\.|\.$|\.(?=\d))/;

            // 判断email参数是否拥有，指定数量的必要字符
            if (match1 != null && match2 != null && match1.length === 1 && match2.length > 0) {
                // 将email参数从 “@” 处分割为字符串数组
                // 这个数组中的第一个元素是邮箱名称，第二个元素是邮箱域名
                let emailArr = email.split("@");

                // 分别对这个字符串数组中的元素进行正则表达式匹配
                if (emailArr.length === 2 && !patt1.test(emailArr[0]) && !patt2.test(emailArr[1])) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        } else {
            return false
        }
    }

    // 处理时间日期格式
    hanleDateFormat(params) {
        let dateY, dateM, dateD, dateH, result;
        if (params.value && typeof params.value === "number" || typeof params.value === "string") {
            let date = new Date(params.value);

            dateY = date.getFullYear();
            dateM = date.getMonth() + 1;
            dateD = date.getDate();
            dateH = date.getHours();
            dateS = date.getMinutes();

            result = dateY + "/" + dateM + "/" + dateD + "/" + " " + dateH + ":" + dateS;

            if (params.format && typeof params.format === "string") {
                // 传递进来的时间日期格式模板
                let formatResult = params.format;

                // 年
                formatResult = formatResult.replace("yyyy", dateY);

                // 月
                if (params.format.search("MM") >= 0) {
                    formatResult = formatResult.replace("MM", dateM + 1 >= 10 ? dateM : "0" + (dateM + 1));
                } else if (params.format.search("mm") >= 0) {
                    formatResult = formatResult.replace("mm", dateM + 1);
                }

                // 日
                if (params.format.search("DD") >= 0) {
                    formatResult = formatResult.replace("DD", dateD >= 10 ? dateD : "0" + dateD);
                } else if (params.format.search("dd") >= 0) {
                    formatResult = formatResult.replace("dd", dateD);
                }

                // 时
                if (params.format.search("HH") >= 0) {
                    formatResult = formatResult.replace("HH", dateH >= 10 ? dateH : "0" + dateH);
                } else if (params.format.search("hh") >= 0) {
                    formatResult = formatResult.replace("hh", dateH);
                }

                // 秒
                if (params.format.search("SS") >= 0) {
                    formatResult = formatResult.replace("SS", dateS >= 10 ? dateS : "0" + dateS);
                } else if (params.format.search("ss") >= 0) {
                    formatResult = formatResult.replace("ss", dateS);
                }

                return formatResult
            } else {
                return result
            }
        }
    }

    // 获取时间日期范围
    // 返回值：String
    // 参数：params, 需要获取的时间日期范围
    // 说明：时间日期范围包括以下选项
    // nowWeekStart 获取本周的开始日期
    // nowWeekEn 获取本周的结束日期
    // lastWeekStart 获取上周的开始日期
    // lastWeekEnd 获取上周的结束日期
    // nextWeekStart 获取下周的开始日期
    // nextWeekEnd 获取下周的结束日期
    // nextFourWeekStart 获取下四周的开始日期
    // nextFourWeekEnd 获取下四周的结束日期
    // nowMonthStart 获取本月的开始日期
    // nowMonthEnd 获取本月的结束日期
    // lastMonthStart 获取下月的开始日期
    // lastMonthEnd 获取下月的结束日期
    // nextMonthStart 获取上月的开始日期
    // nextMonthEnd 获取上月的结束日期
    // quarterStartMonth 获取本季度的开始月份
    // quarterStart 获取本季度的结束月份
    // quarterEnd 获得本季度的结束日期
    // lastQuarterStart 获取上季度的开始月份
    // lastQuarterEnd 获取上季度的结束月份
    // nextQuarterStart 获取下季度的开始月份
    // nextQuarterEnd 获取下季度的结束月份
    // nowYearStart 获取今年开始的日期
    // nowYearEnd 获取今年结束的日期
    // lastYearStart 获取去年开始的日期
    // lastYearEnd 获取去年结束的日期
    // nextYearStart 获取明年开始的日期
    // nextYearEnd 获取明年结束的日期
    getDateRang(params) {
        //当前日期
        let now = new Date();
        let nowDayOfWeek = now.getDay(); //今天本周的第几天
        let nowDay = now.getDate(); //当前日
        let nowMonth = now.getMonth(); //当前月
        let nowYear = now.getYear(); //当前年
        nowYear += (nowYear < 2000) ? 1900 : 0; //

        //上月日期
        let lastMonthDate = new Date();
        lastMonthDate.setDate(1);
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
        let lastYear = lastMonthDate.getYear();
        let lastMonth = lastMonthDate.getMonth();

        // 获取时间日期范围方法载体
        let fn = {};

        //格局化日期：yyyy-MM-dd
        fn.formatDate = (date) => {
            let myyear = date.getFullYear();
            let mymonth = date.getMonth() + 1;
            let myweekday = date.getDate();

            if (mymonth < 10) {
                mymonth = "0" + mymonth;
            }
            if (myweekday < 10) {
                myweekday = "0" + myweekday;
            }
            return (myyear + "-" + mymonth + "-" + myweekday);
        }

        //获得某月的天数
        fn.getMonthDays = (myMonth) => {
            let monthStartDate = new Date(nowYear, myMonth, 1);
            let monthEndDate = new Date(nowYear, myMonth + 1, 1);
            let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
            return days;
        }

        //获得本周的开始日期
        fn.nowWeekStart = () => {
            let weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
            return fn.formatDate(weekStartDate);
        }

        //获得本周的结束日期
        fn.nowWeekEnd = () => {
            let weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
            return fn.formatDate(weekEndDate);
        }

        // 获得上周的开始日期
        fn.lastWeekStart = () => {
            let nowWeekStart = new Date(fn.nowWeekStart()).getTime();
            let oneWeek = 1000 * 60 * 60 * 24 * 7;
            let lastWeekStart = nowWeekStart - oneWeek;
            return fn.formatDate(new Date(lastWeekStart));
        }

        // 获得上周的结束日期
        fn.lastWeekEnd = () => {
            return fn.formatDate(new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1))
        }

        // 获取下周的开始日期
        fn.nextWeekStart = () => {
            let nowWeekEnd = new Date(fn.nowWeekEnd()).getTime();
            let oneDay = 1000 * 60 * 60 * 24;
            return fn.formatDate(new Date(nowWeekEnd + oneDay));
        }

        // 获取下周的结束日期
        fn.nextWeekEnd = () => {
            let nextWeekStart = new Date(fn.nextWeekStart()).getTime();
            // 因为是通过下周的开始日期计算出的下周结束日期，所以这里的oneWeek是6天不是7天
            let oneWeek = 1000 * 60 * 60 * 24 * 6;
            return fn.formatDate(new Date(nextWeekStart + oneWeek));
        }

        // 获取下四周的开始日期
        fn.nextFourWeekStart = () => {
            let nowWeekEnd = new Date(fn.nowWeekEnd()).getTime();
            let oneDay = 1000 * 60 * 60 * 24;
            let nextFourWeekStart = nowWeekEnd + oneDay;
            return fn.formatDate(new Date(nextFourWeekStart));
        }

        // 获取下四周的结束日期
        fn.nextFourWeekEnd = () => {
            let nextFourWeekStart = new Date(fn.nextFourWeekStart()).getTime();
            let fourWeek = 1000 * 60 * 60 * 24 * 27;
            let nextFourWeekEnd = nextFourWeekStart + fourWeek;
            return fn.formatDate(new Date(nextFourWeekEnd));
        }

        //获得本月的开始日期
        fn.nowMonthStart = () => {
            let monthStartDate = new Date(nowYear, nowMonth, 1);
            return fn.formatDate(monthStartDate);
        }

        //获得本月的结束日期
        fn.nowMonthEnd = () => {
            let monthEndDate = new Date(nowYear, nowMonth, fn.getMonthDays(nowMonth));
            return fn.formatDate(monthEndDate);
        }

        //获得上月开始日期
        fn.lastMonthStart = () => {
            let lastMonthStartDate = new Date(nowYear, lastMonth, 1);
            return fn.formatDate(lastMonthStartDate);
        }

        //获得上月结束日期
        fn.lastMonthEnd = () => {
            let lastMonthEndDate = new Date(nowYear, lastMonth, fn.getMonthDays(lastMonth));
            return fn.formatDate(lastMonthEndDate);
        }

        // 获得下月开始日期
        fn.nextMonthStart = () => {
            let nowMonthEnd = new Date(fn.nowMonthEnd()).getTime();
            let oneDay = 1000 * 60 * 60 * 24;
            let nextMonthStart = nowMonthEnd + oneDay;
            return fn.formatDate(new Date(nextMonthStart));
        }

        // 获得下月结束日期
        fn.nextMonthEnd = () => {
            let nextMonthStart = new Date(fn.nextMonthStart());
            return fn.formatDate(new Date(nextMonthStart.getFullYear(), nextMonthStart.getMonth() + 1, 0));
        }

        // 获得本季度的开始月份
        fn.quarterStartMonth = () => {
            let quarterStartMonth = 0;
            if (nowMonth < 3) {
                quarterStartMonth = 0;
            }
            if (2 < nowMonth && nowMonth < 6) {
                quarterStartMonth = 3;
            }
            if (5 < nowMonth && nowMonth < 9) {
                quarterStartMonth = 6;
            }
            if (nowMonth > 8) {
                quarterStartMonth = 9;
            }
            return quarterStartMonth;
        }

        // 获得本季度的开始日期
        fn.quarterStart = () => {
            let quarterStartDate = new Date(nowYear, fn.quarterStartMonth(), 1);
            return fn.formatDate(quarterStartDate);
        }

        // 获得本季度的结束日期
        fn.quarterEnd = () => {
            let quarterEndMonth = fn.quarterStartMonth() + 2;
            let quarterStartDate = new Date(nowYear, quarterEndMonth, fn.getMonthDays(quarterEndMonth));
            return fn.formatDate(quarterStartDate);
        }

        // 上季度的开始日期
        fn.lastQuarterStart = () => {
            let lastQuarterStart = new Date(nowYear, fn.quarterStartMonth() - 3, 1).getTime();
            return fn.formatDate(new Date(lastQuarterStart));
        }

        // 上季度的结束日期
        fn.lastQuarterEnd = () => {
            let lastQuarterEnd = new Date(nowYear, fn.quarterStartMonth(), 0).getTime();
            return fn.formatDate(new Date(lastQuarterEnd));
        }

        // 下季度的开始日期
        fn.nextQuarterStart = () => {
            let nowQuarterEnd = new Date(fn.quarterEnd()).getTime();
            let oneDay = 1000 * 60 * 60 * 24;
            return fn.formatDate(new Date(nowQuarterEnd + oneDay));
        }

        // 下季度的结束日期
        fn.nextQuarterEnd = () => {
            let nextQuarterEnd = new Date(nowYear, fn.quarterStartMonth() + 6, 0).getTime();
            return fn.formatDate(new Date(nextQuarterEnd));
        }

        // 今年开始的日期
        fn.nowYearStart = () => {
            return fn.formatDate(new Date(nowYear, 0, 1));
        }

        // 今年结束的日期
        fn.nowYearEnd = () => {
            return fn.formatDate(new Date(nowYear, 12, 0));
        }

        // 去年开始的日期
        fn.lastYearStart = () => {
            return fn.formatDate(new Date(nowYear - 1, 0, 1));
        }

        // 去年结束的日期
        fn.lastYearEnd = () => {
            return fn.formatDate(new Date(nowYear - 1, 12, 0));
        }

        // 明年开始的日期
        fn.nextYearStart = () => {
            return fn.formatDate(new Date(nowYear + 1, 0, 1));
        }

        // 明年结束的日期
        fn.nextYearEnd = () => {
            return fn.formatDate(new Date(nowYear + 1, 12, 0));
        }

        // 根据参数返回需要时间日期范围
        if (params && fn[params]) {
            return fn[params]()
        }
    },
}

export default AwesomeUtil;
