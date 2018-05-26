<template>
	<div class="app">
		<table>
			<thead>
				<td><input type="checkbox" v-model="checkAll"></td>
				<td>作业日期</td>
				<td>作业时间起</td>
				<td>作业时间止</td>
				<td>设施名称</td>
				<td>作业类别</td>
				<td>作业内容</td>
				<td>施工地点</td>
				<td>封道类型</td>
				<td>作业车辆</td>
				<td>操作</td>
			</thead>
			<tbody>
				<tr v-for="(item,index) in result">
					<td><input type="checkbox" v-model="item.checked"></td>
					<td>{{item.date}}</td>
					<td>{{item.timer_start}}</td>
					<td>{{item.timer_end}}</td>
					<td>{{item.fac_name}}</td>
					<td>{{item.job_type}}</td>
					<td>{{item.job_content}}</td>
					<td>{{item.job_addr}}</td>
					<td>{{item.closure_type}}</td>
					<td>{{item.job_cars}}</td>
					<td><button>编辑</button><button>删除</button></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
	export default{
		data() {
			return {
				result:[],//存储返回数据
			}
		},
		created(){
			this.getData()
		},
		methods:{
			/**请求数据**/
			getData(){
				this.axios({
					method:'get',
					url:'../static/test.json',
					responseType:'json',
				})
				.then(res =>{
					console.log(res.data)
					if(res.data.code === 1){
						this.result = res.data.data;
					}
				})
				.catch(err =>{
					console.log(err)
				})
			}
		},
		//通过计算属性来监听每个checkbox的变化
		computed:{
			checkAll:{
				get(){
					return this.selectCount === this.result.length;
				},
				set(val){
					this.result.forEach(function(item){
						item.checked = val;
					});
					return val;
				}
			},
			selectCount:{
				get(){
					var i = 0
					this.result.forEach(function(item){
						if(item.checked){
							i++;
						} 
					});
					return i;
				}
			},
			checkedGroups:{
				get(){
					var checkedGroups = [];
					this.result.forEach(function(item){
						if(item.checked){
							checkedGroups.push(item);
						}
					});
					return checkedGroups;
				}
			}
		}
	}
</script>
<!-- 可以使用less/sass,在webpack配置文件中设置一下 -->
<style scoped>
	.app table{
		margin: 0 auto;
		text-align: left;
		border-collapse:collapse; 
	}
	.app table thead{
	font-weight: 600;
	}
	.app table tbody{
		font-size: 12px;
	}
	td{
		border: 1px solid #000;
		/*控制width最大200,超出截取*/
		max-width: 200px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>