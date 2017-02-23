import {Component} from "angular2/core";
import {OnInit} from "angular2/src/core/linker/interfaces";
import {PostService} from "./post.service";


@Component({
    selector: 'posts',
    templateUrl:'app/posts.component.html',
    providers: [PostService]
})
export class PostsComponent implements OnInit{
    posts: any[];

    constructor(private _postService: PostService) {
    }

    ngOnInit(){
        return this._postService.getPosts()
            .subscribe(posts => this.posts = posts);
    }
}