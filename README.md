<h1>login_reg</h1>
<h4>This app is just for learning node.js</h4>
<p>The packages</p>
<ul>
    <li>express</li>
    <li>body-parser</li>
    <li>ejs</li>
    <li>node-couchdb</li>
    <li>path</li>
</ul>
<h4>Database info</h4>
<ul>
    <li>Doc:
        {
  "_id": "_design/view-all",
  "_rev": "3-cc81c32cdf5d0e1005c5fb5fdd1da31b",
  "views": {
    "all-index": {
      "map": "function (doc) {\n  emit(doc.email, doc.pass, {\n  \"name\": \"Mostafa\",\n  \"email\": \"mostafa@email.com\",\n  \"pass\": \"1234\",\n  \"phone\": \"012\",\n  \"address\": \"24 El-fairouz\"\n  });\n}"
    }
  },
  "language": "javascript"
}
    </li>
    <li>view: _design/all_data/_view/new-view</li>
</ul>

<h4>Still to code:</h4>
<ul>
    <li>Add update..</li>
    <li>Add photo...</li>
    <li>Add Admin...</li>
    <li>Start using session in thrown data...</li>
</ul>
