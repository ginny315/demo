function Employee(data){
    this.employeeId = data.employeeId || 0;
    this.ssId = data.ssId || '0000-000-0000';
    this.name = data.name || '';
    this.occupation  = data.occupation || '';
    this.companyName = data.compangName || '';
    this.companyAddress = data.companyAddress || '';
}

Employee.prototype.getName = function(){
    return this.name;
}

Employee.prototype.getOccupation = function(){
    return this.occupation;
}
var a = new Employee({
    employeeId:1234,
    ssId:'123',
    name:'ginny',
    occupation:'header'
})
/**
 * 如果两个员工具有相同的ssId name，
 * 随着所创建对象的增加，数据出现重复的数量也将增加，
 * 这种实现方法的低效消耗了更多的内存
*/

/**
 * 享元模式的第一阶段是，从我们想要实现更高效的内存存储的对象的原来的外部状态数据
 * 中提取出要成为内部状态的数据
 */
function Person(data){
    this.ssId = data.ssId || '';
    this.name = data.name || '';
}
function Company(data){
    this.name = data.name || '';
    this.address = data.address || '';
}
var personFactory = (function(){
    var people = {},
        personCount = 0;

    return {
        //建立一个方法，根据输入数据所提供的给定的ssId，如果还不存在该ssId对应的
        //Person类实例，则创建一个实例；如果已经存在，则返回该对象而不是创建一个新的对象
        createPerson:function(data){
            var person = people[data.ssId],
                newPerson;

            if(person){
                return person;
            }else{
                newPerson = new Person(data);
                people[newPerson.ssId] = newPerson;
                personCount++;
                return newPerson;
            }
        },
        getPersonCount:function(){
            return personCount;
        }
    }
}()),

companyFactory = (function(){
    var companies = {},
        companyCount = 0;

    return {
        createComppany:function(data){
            var company = companies[data.name],
                newCompany;
            if(company){
                return company;
            }else{
                newCompany = new Company(data);
                companies[newCompany.name] = newCompany;
                companyCount++;
                return newCompany;
            }
        },
        getCompanyCount:function(){
            return companyCount;
        }
    }
}()),
/**
 * 实现享元模式的第三阶段，使得对象的创建可以用原始的方式设置
 * 实现了最高效的数据存储处理，对用户来说是透明的
 * 用户不需要访问对象中的底层方法，只需要按此处理函数的交互方式进行使用
 */
employee = (function(){
    var employees = {},
        employeeCount = 0;

    return {
        add:function(data){
            var person = personFactory.createPerson({
                ssId:data.ssId,
                name:data.name
            }),
                company = companyFactory.createComppany({
                    name:data.compangName,
                    address:data.companyAddress
             });
             employees[data.employeeId] = {
                 employeeId:data.employeeId,
                 occupation:data.occupation,
                 person:person,
                 company:company
             };
             employeeCount++;
        },
        getName:function(employeeId){
            return employees[employeeId].person.name;
        },
        getOccupation:function(employeeId){
            return employees[employeeId].occupation;
        },
        getTotalCount:function(){
            return employeeCount;
        }
    }
}());


