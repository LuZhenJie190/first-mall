
export function getnowDate(){           
            let nowDate=new Date();
            let year=nowDate.getFullYear();
            let mon=nowDate.getMonth()<10? "0"+nowDate.getMonth():nowDate.getMonth();
            let day=nowDate.getDate()<10?"0"+nowDate.getDate():nowDate.getDate();
            let h=nowDate.getHours()<10?"0"+nowDate.getHours():nowDate.getHours();
            let m=nowDate.getMinutes()<10?"0"+nowDate.getMinutes():nowDate.getMinutes();
            let s=nowDate.getSeconds()<10?"0"+nowDate.getSeconds():nowDate.getSeconds();
            let obj=`${year}-${mon}-${day} ${h}:${m}:${s}`;
            return obj; 

}
