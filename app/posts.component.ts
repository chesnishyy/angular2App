import {Component} from "angular2/core";
import {OnInit} from "angular2/src/core/linker/interfaces";
import {PostService} from "./post.service";
import {SpinnerComponent} from "./spinner.component";


@Component({
    templateUrl:'app/posts.component.html',
    providers: [PostService],
    directives: [SpinnerComponent]
})
export class PostsComponent implements OnInit{
    posts: any[];
    isLoading = true;
    currentPost;

    constructor(private _postService: PostService) {
    }

    ngOnInit(){
         this._postService.getPosts()
            .subscribe(posts => this.posts = posts,
                null, () => {
                    this.isLoading = false;
                }
            );
    }

    select(post){
        this.currentPost = post;
    }
}