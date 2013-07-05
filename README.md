jquery.petagination.js
============

`PetaPoco` と `Bootstrap` を使用した際の
Pagination制御を容易にする jQuery Plugin です。

実装例
-----

`sample.js`


    $(document).ready(function () {
        //Ajaxでデータ取得
        $.post("/Upload/GetData", { page: 1 }, function (data) {
            //callback
            //console.log(data);
            setTableData(data);
        });
    }

    /**
     * テーブルにデータをセット
     * @param data {PetaPoco.Page<T>}
     */
    function setTableData(data) {

        if (typeof (data.Items) == "undefined") {
            return; //data.itemsが無ければ終了
        }

        var rows = [];
        for (var i = 0; i < data.Items.length; i++) {
            var obj = data.Items[i];
            var cells = [];

            cells[0] = obj.hoge;
            cells[1] = obj.foo;
            cells[2] = obj.bar;

            rows.push("<tr><td>" + cells.join("</td><td>") + "</td></tr>");
        }

        $("#dataTable>tbody").html(rows.join(""));

        //pagination設定
        $("#pagination").petagination({
            CurrentPage: data.CurrentPage,
            TotalPages: data.TotalPages,
            PagesPerScreen: tranceparency.PagesPerScreen,
            ItemClick: function (obj) {
                var page = $(obj).attr("data-page");
                //console.log(page);
                $.post("/Upload/GetData", { page: page }, function (data) {
                    //callback
                    //console.log(data);
                    setTableData(data);
                });
            }
        });
    }


`Index.aspx`

    <!DOCTYPE html>
    <html>
    <head>
        <title>sample</title>
        <link type="text/css" rel="Stylesheet" href="/Content/bootstrap/css/bootstrap.min.css" />
    </head>
    <body>
        <table id="dataTable" class="table table-striped table-bordered">
            <tbody></tbody>
        </table>
        <div id="pagination"></div>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script src="/Content/bootstrap/js/bootstrap.min.js"></script>
        <script src="/Scripts/jquery.petagination.js"></script>
    </body>
    </html>



`HomeController.cs`

    :
    public ActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public ActionResult GetData(int page)
    {
        var db = new PetaPoco.Database();
        var sql = @"select T.* from hoge T";
        return Json(
            db.Page<hoge>(page, 10, sql);
        );
    }

