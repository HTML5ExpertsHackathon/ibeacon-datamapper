iBeacon DataMapper
======
iBeacon Serverから出力されるjsonデータを整形して出力する

## How to use
	<script type="text/javascript" src="./jquery-2.0.3.min.js"></script>
	<script type="text/javascript" src="./output.js"></script>
	<script type="text/javascript">
	window.onload = function(e) {
		var adapter = new DataMapper.Adapter();
		adapter.set_callback(function(item) {
			console.log(item);
		});
	};
	</script>