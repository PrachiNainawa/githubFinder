$(document).ready(function(){
    $('#searchUser').keyup(function(e){
        let username = e.target.value;
       
        //make a request to github server
        $.ajax({
            url:'https://api.github.com/users/'+username,
            data : {
                client_id:'ea2d3ee57346f1eb467f',
                client_secret:'814a801137d6c983d8419e427ca69cf6d11a3a8b'
            }
        }).done(function(user){
            $.ajax({
                url:'https://api.github.com/users/'+username+"/repos",
                data : {
                    client_id:'ea2d3ee57346f1eb467f',
                    client_secret:'814a801137d6c983d8419e427ca69cf6d11a3a8b',
                    sort: 'created: asc',
                    per_page:5
                }
            }).done(function(repos){
                $.each(repos,function(index,repo){
                    $("#repos").append(`
                    <br>
                    <div class="card p-1 bg-theme">
                    <div class="row">
                    <div class="col-md-7">
                        <strong>${repo.name}:</strong><br>${repo.description}
                    </div>
                    <div class="col-md-3">
                        <span class="badge badge-danger">Forks: ${repo.forks_count}</span>
                        <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
                        <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                    </div>
                    <div class="col-md-2">
                        <a href="${repo.html_url}" target="_blank" class="btn btn-light">Repo Page</a>
                    </div>
                    </div>
                    `)
                })
            })
            $('#profile').html(`
            <div class="card ">
            
                <h3 class="card-title">${user.name}</h3>
            
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3">
                    <img  src="${user.avatar_url}"><br>
                    <a target="_blank" class="btn btn-dark btn-block" href="${user.html_url}">View profile</a>
                    </div>
                    <div class="col-md-9">
                    <span class="badge badge-danger">Public Repos: ${user.public_repos}</span>
                    <span class="badge badge-primary">Public Gists: ${user.public_gists}</span>
                    <span class="badge badge-success">Followers: ${user.followers}</span>
                    <span class="badge badge-info">Following: ${user.following}</span>
                    <br><br>
                    <ul class="list-group">
                        <li class="list-group-item">Company: ${user.company}</li>
                        <li class="list-group-item">Website: ${user.blog}</li>
                        <li class="list-group-item">Location: ${user.location}</li>
                        <li class="list-group-item">Member since: ${user.created_at}</li>
                    </ul>
                    </div>
                </div>
            </div>
          </div>
          <br>
          <h3 class="page-header">Latest Repos</h3> 
          <hr>
          <div id="repos"></div>
            `);
            $("#profile").css("backgroundColor","whitesmoke");
        });
    });
    
});