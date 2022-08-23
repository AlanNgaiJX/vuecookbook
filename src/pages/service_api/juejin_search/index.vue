<template>
    <div id="juejinSearch">
        <div class="serach-pannel">
            <div class="search-input">
                <input type="text" v-model="key_word" />
                <button @click="kickOffSearch">serach</button>
            </div>
            <div class="settting">
                <input class="size-setting" type="number" v-model="size_setting" />
                <select class="sort" name="sort-group" v-model="sortBy">
                    <option value="like desc">like desc</option>
                    <option value="like asce">like asce</option>
                    <option value="time desc">time desc</option>
                    <option value="time asce">time asce</option>
                    <option value="nomal">nomal</option>
                </select>
            </div>
        </div>
        <ul class="article-list" v-if="!isFetching">
            <li
                :class="['article-item', !article.link ? 'disable' : '']"
                v-for="(article, index) in articleList"
                :key="index"
                @click="linkTo(article.link)"
            >
                <div class="detial">
                    <p class="index" v-text="index + 1"></p>
                    <p class="author-name" v-text="article.authorName"></p>
                    <p class="time">{{ article.time | timeFromNow }}</p>
                    <p class="like-count" v-text="'like * ' + article.likeCount"></p>
                </div>
                <div class="title" v-text="article.title"></div>
                <div class="describe" v-text="article.describe"></div>
            </li>
        </ul>
        <div v-else>fetching ...</div>
    </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

moment.locale("zh-cn");

export default {
    name: "juejinSearch",
    components: {},
    data() {
        return {
            articleList: [],
            size_setting: 200,
            size: 200,
            has_more: true,
            cursor: "1",
            key_word: "url",
            isFetching: false,
            sortBy: "like desc"
        };
    },
    filters: {
        timeFromNow(time) {
            time += "000";
            return moment(parseInt(time)).fromNow();
        }
    },
    watch: {
        sortBy(nv, ov) {
            if (nv !== ov) {
                this.sortArticleList();
            }
        }
    },
    methods: {
        parseArticleList(list) {
            return list.map(item => {
                const article = {};
                const result_model = item.result_model;
                const { article_id, author_user_info, article_info } = result_model;

                article.id = article_id;
                article.authorName = author_user_info.user_name;
                article.time = article_info.ctime;
                article.title = article_info.title;
                article.describe = article_info.brief_content;
                article.link = article_info.link_url;
                article.likeCount = article_info.digg_count;

                return article;
            });
        },

        api_search(args) {
            return axios.post("/juejin/search_api/v1/search", {
                cursor: args.cursor,
                id_type: 0,
                key_word: args.key_word,
                limit: 20, //这limit改了没作用
                search_type: 0
            });
        },

        // 【 点击 search 】
        kickOffSearch() {
            this.articleList = [];
            this.size = this.size_setting;
            this.has_more = true;
            this.cursor = "1";
            this.isFetching = false;
            this.search();
        },

        search() {
            this.isFetching = true;

            this.api_search({
                cursor: this.cursor,
                key_word: this.key_word
            }).then(res => {
                const dataList = res.data.data;
                const { cursor, has_more } = res.data;
                const list = dataList.filter(item => {
                    return item.result_type === 2;
                });

                this.articleList = this.articleList.concat(this.parseArticleList(list));
                this.size -= dataList.length;
                this.cursor = cursor;
                this.has_more = has_more;

                if (this.has_more && this.size > 0) {
                    this.search();
                } else {
                    this.sortArticleList();
                }
            });
        },

        sortArticleList() {
            this.articleList.sort((a, b) => {
                switch (this.sortBy) {
                    case "like desc":
                        return b.likeCount - a.likeCount;

                    case "like asce":
                        return a.likeCount - b.likeCount;

                    case "time desc":
                        return b.time - a.time;

                    case "time asce":
                        return a.time - b.time;

                    case "normal":
                        return;

                    default:
                        break;
                }
            });
            this.isFetching = false;
        },

        linkTo(link) {
            window.open(link);
        }
    }
};
</script>

<style lang="scss" scoped>
#juejinSearch {
    .serach-pannel {
        position: fixed;
        top: 0;
        height: 50px;
        background-color: yellow;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 30px;
        box-sizing: border-box;

        .search-input {
            display: flex;
            align-items: center;

            input {
                width: 100px;
            }

            input,
            button {
                height: 30px;
            }

            button {
                margin-left: 10px;
                cursor: pointer;
            }
        }

        .settting {
            display: flex;

            .size-setting {
                width: 40px;
                margin-right: 10px;
            }
        }
    }

    .article-list {
        box-sizing: border-box;
        padding: 0 15px;
        color: #333;

        .article-item {
            border-top: 1px solid #eee;
            margin-top: 25px;
            padding: 15px 0;

            &.disable {
                background-color: rgba(255, 0, 0, 0.091);
            }

            .detial {
                display: flex;
                align-items: center;

                p:nth-child(n + 2) {
                    &::before {
                        content: "·";
                        display: inline-block;
                        margin: 0 10px;
                        color: #999;
                    }
                }

                .index {
                    background-color: blue;
                    color: #ffffff;
                    display: block;
                    padding: 5px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .author-name {
                }
            }

            .title {
                margin-top: 15px;
                font-size: 15px;
                font-weight: bold;
            }

            .describe {
                margin-top: 10px;
                overflow: hidden;
                display: -webkit-box;
                text-overflow: ellipsis;
                -webkit-line-clamp: 2; // 控制行数
                -webkit-box-orient: vertical;
                color: rgb(133, 131, 131);
            }
        }
    }
}
</style>
