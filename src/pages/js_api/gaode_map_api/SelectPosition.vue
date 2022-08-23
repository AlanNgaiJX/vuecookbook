<template>
    <div id="SelectPosition">
        <!-- 返回/取消按钮 -->
        <div class="cancel-btn">
            <svg
                t="1637117963538"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2542"
                width="200"
                height="200"
            >
                <path
                    d="M538.288 198.624l-11.312-11.312a16 16 0 0 0-22.64 0L187.312 504.336a16 16 0 0 0 0 22.64L504.336 844a16 16 0 0 0 22.64 0l11.312-11.312a16 16 0 0 0 0-22.624l-294.4-294.4 294.4-294.4a16 16 0 0 0 0-22.64z"
                    p-id="2543"
                ></path>
            </svg>
        </div>

        <!-- 确认/保存按钮 -->
        <div class="confirm-btn" :class="{ active: currSelectedAddress }" @click="confirmAddress">
            {{ confirmBtnText }}
        </div>

        <!-- 地图区域 -->
        <div class="basic-map-wrap">
            <!-- 基础地图层 -->
            <div id="basicMap" ref="basicMap"></div>
            <!-- 中心指针 -->
            <div class="center-pointer-wrap" v-show="!currSelectedAddress">
                <div class="center-pointer-inner">
                    <div class="pointer-icon" :class="{ 'is-dragging': isDragging }"></div>
                    <div class="bottom-shadow" :class="{ 'is-dragging': isDragging }"></div>
                </div>
            </div>
        </div>

        <!-- 搜索框和展示层 -->
        <div class="search-panel">
            <!-- 搜索框 -->
            <div class="input-wrap">
                <div class="label">
                    <svg
                        t="1637120176712"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="3392"
                        width="200"
                        height="200"
                    >
                        <path
                            d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"
                            p-id="3393"
                        ></path>
                    </svg>
                </div>
                <input
                    type="text"
                    class="search-input"
                    id="search-input"
                    placeholder="搜索地点"
                    v-model="searchInput"
                    @keyup="handleAutoomplete"
                />
                <div class="btn-clear" v-show="searchInput !== ''" @click="searchInput = ''">
                    取消
                </div>
            </div>
            <!-- 搜索框搜索结果 -->
            <div class="address-list-wrap" ref="addressListWrap">
                <div class="address-list">
                    <div
                        class="address-item"
                        v-for="(item, index) in addressList"
                        :key="index"
                        @click="selectAddress(item)"
                    >
                        <div class="left">
                            <div class="address-name">{{ item.name }}</div>
                            <div class="address-detail">
                                {{ item.address.length ? item.address : item.district }}
                            </div>
                        </div>
                        <div class="right">
                            <div
                                class="selected"
                                v-show="
                                    currSelectedAddress &&
                                        item.id === currSelectedAddress.id &&
                                        item.name === currSelectedAddress.name
                                "
                            >
                                <svg
                                    t="1637213962558"
                                    class="icon"
                                    viewBox="0 0 1024 1024"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    p-id="2467"
                                    width="200"
                                    height="200"
                                >
                                    <path
                                        d="M887.904 298.208c-12.864-12.064-33.152-11.488-45.216 1.408L415.936 753.984l-233.12-229.696C170.208 511.872 149.952 512 137.536 524.608c-12.416 12.576-12.256 32.864 0.352 45.248l256.48 252.672c0.096 0.096 0.224 0.128 0.32 0.224 0.096 0.096 0.128 0.224 0.224 0.32 2.016 1.92 4.448 3.008 6.784 4.288 1.152 0.672 2.144 1.664 3.36 2.144 3.776 1.472 7.776 2.24 11.744 2.24 4.192 0 8.384-0.832 12.288-2.496 1.312-0.544 2.336-1.664 3.552-2.368 2.4-1.408 4.896-2.592 6.944-4.672 0.096-0.096 0.128-0.256 0.224-0.352 0.064-0.096 0.192-0.128 0.288-0.224l449.184-478.208C901.44 330.592 900.768 310.336 887.904 298.208z"
                                        p-id="2468"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 拖拽定位搜索结果 -->
        </div>
    </div>
</template>

<script>
export default {
    name: "SelectPosition",
    props: {
        confirmBtnText: {
            type: String,
            default: "保存"
        },
        initCenter: {
            type: Array,
            default: null
            // test
            // default: () => {
            //     return [113.283874, 23.125367];
            // }
        },
        initLocation: {
            type: String,
            default: ""
            // test
            // default: "大雄寿司(中华广场店)"
        }
    },
    data() {
        return {
            map: null,
            mapSize: {
                width: 0,
                height: 0,
                centerPoint: [0, 0]
            },

            // 搜索地点输入框
            searchInput: "",
            searchInputTimer: null,

            // 拖拽时,搜索附近
            searchServer: null,
            // 点击地图上热点时,搜索热点详情
            searchServer2: null,
            // 搜索时,自动补全
            autocompleteServer: null,
            addressList: [],
            searching: false,
            pagination: {
                pageSize: 50,
                pageIndex: 1
            },

            // 交互状态
            isDragging: false,
            // 当前选中地址
            currSelectedAddress: null
        };
    },
    methods: {
        initMap() {
            const basicMap = this.$refs["basicMap"];
            this.mapSize = {
                width: basicMap.clientWidth,
                height: basicMap.clientHeight,
                centerPointPx: [basicMap.clientWidth / 2, basicMap.clientHeight / 2]
            };

            // 地图实例
            this.map = new AMap.Map(basicMap, {
                zoom: 18,
                center: this.initCenter,
                rotateEnable: false,
                highlightFeatrueClick: true,
                isHotspot: true
            });

            // 搜索服务
            this.map.plugin(["AMap.PlaceSearch", "AMap.AutoComplete"], () => {
                const searchType =
                    "汽车服务|汽车销售|汽车维修|摩托车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|道路附属设施|地名地址信息|公共设施";
                this.searchServer = new AMap.PlaceSearch({
                    type: searchType,
                    pageSize: this.pagination.pageSize
                });
                this.searchServer2 = new AMap.PlaceSearch({
                    type: searchType,
                    pageSize: 1
                });
                this.searchServer.on("complete", this.searchCallback);
                this.autocompleteServer = new AMap.Autocomplete();
                this.autocompleteServer.on("complete", this.autocompleteCallback);

                // 如果有初始位置
                if (this.initCenter) {
                    this.searchServer2.searchNearBy(
                        this.initLocation,
                        this.initCenter,
                        100,
                        (status, result) => {
                            const { poiList } = result;
                            if (!poiList.pois.length) {
                                return this.emitErrorMsg("初始位置无效");
                            } else {
                                const target = poiList.pois[0];
                                const item = this.translateItem(target);
                                this.addressList = [item];
                                this.currSelectedAddress = item;
                                this.selectAddress(item, true);
                            }
                        }
                    );
                }
            });

            this.map.on("hotspotclick", this.handleHotspotClick);
            this.map.on("dragstart", this.handleMapDragStart);
            this.map.on("dragging", this.handleMapDragging);
            this.map.on("dragend", this.handleMapDragend);
        },
        handleSearch(center) {
            this.searchServer.searchNearBy("", center, 500);
        },
        searchCallback({ poiList }) {
            const list = poiList.pois;
            this.addressList = list.map(item => {
                return this.translateItem(item);
            });
            this.$refs["addressListWrap"].scrollTop = 0;
        },
        handleAutoomplete() {
            if (this.searchInput.trim() !== "") {
                if (this.searchInputTimer) {
                    clearTimeout(this.searchInputTimer);
                }
                this.searchInputTimer = setTimeout(() => {
                    this.autocompleteServer.search(this.searchInput);
                }, 300);
            }
        },
        autocompleteCallback({ tips }) {
            this.addressList = tips.map(item => {
                return this.translateItem(item);
            });
            this.$refs["addressListWrap"].scrollTop = 0;
        },
        selectAddress(address, zoomFix = false) {
            /* address exp*
              {
                "id": "B025004E9A",
                "name": "厦门美东",
                "district": "福建省厦门市海沧区",
                "location": [
                    118.017511,
                    24.489544
                ],
                "address": "马青路1289号",
            }
            */
            const marker = new AMap.Marker({
                icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
                position: address.location,
                anchor: "bottom-center"
            });
            this.map.clearMap();
            this.map.setZoomAndCenter(
                zoomFix ? this.map.getZoom() : 18,
                address.location,
                false,
                300
            );
            this.currSelectedAddress = address;
            setTimeout(() => {
                this.map.add(marker);
            }, 300);
        },
        // 统一翻译列表的子元素为目标对象
        translateItem(item) {
            const { id, name, address, location, district } = item;
            return {
                id,
                name,
                address,
                location,
                district
            };
        },
        // 确认/保存
        confirmAddress() {
            this.$emit("change", this.currSelectedAddress);
            console.log(this.currSelectedAddress);
        },

        // 地图上的事件回调
        handleHotspotClick(e) {
            this.searchServer2.getDetails(e.id, (status, result) => {
                const { poiList } = result;
                if (!poiList.pois.length) {
                    return this.emitErrorMsg("该位置无效");
                } else {
                    const target = poiList.pois[0];
                    const item = this.translateItem(target);
                    this.addressList = [item];
                    this.currSelectedAddress = item;
                    this.selectAddress(item, true);
                }
            });
        },
        handleMapDragStart() {
            this.isDragging = true;
            this.currSelectedAddress = null;
            this.map.clearMap();
        },
        handleMapDragging() {},
        handleMapDragend(e) {
            this.isDragging = false;
            const { lng, lat } = this.map.getCenter();
            const center = [lng, lat];
            this.handleSearch(center);
        },

        // 触发外部事件
        emitErrorMsg(msg) {
            this.$emit("errMsg", msg);
            return false;
        }
    },
    mounted() {
        this.initMap();
    }
};
</script>

<style lang="scss">
#SelectPosition {
    width: 100%;
    height: 100%;

    .basic-map-wrap {
        width: 100%;
        height: 50vh;
        position: relative;

        #basicMap {
            width: 100%;
            height: 100%;
        }

        .center-pointer-wrap {
            width: 19px;
            height: 31px;
            position: absolute;
            z-index: 888;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -100%);

            .center-pointer-inner {
                position: relative;
                width: 19px;
                height: 31px;

                .pointer-icon {
                    width: 100%;
                    height: 100%;
                    background-image: url("https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png");
                    background-position: center;
                    background-size: contain;
                    background-repeat: no-repeat;
                    transition: all 0.3s;

                    &.is-dragging {
                        transform: translateY(-50%);
                    }
                }

                .bottom-shadow {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    width: 6px;
                    height: 6px;
                    transform: translate(-50%, 50%);
                    background-color: rgba(0, 0, 0, 0.2);
                    border-radius: 100%;
                    box-shadow: 0px 4px 6px 8px rgba(0, 0, 0, 0.1);
                    opacity: 0;
                    transition: all 0.3s;

                    &.is-dragging {
                        opacity: 1;
                    }
                }
            }

            &::after {
                content: "";
            }
        }
    }

    .cancel-btn {
        background-color: #fff;
        width: 30px;
        height: 30px;
        padding: 4px;
        position: fixed;
        top: 8px;
        left: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
        border-radius: 0.2rem;
        z-index: 888;

        .icon {
            width: 30px;
            height: 30px;
            fill: #666;
        }
    }

    .confirm-btn {
        width: 80px;
        height: 60px;
        position: fixed;
        top: 8px;
        right: 4px;
        z-index: 888;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        font-size: 24px;
        background-color: #409eff;
        color: #fff;
        opacity: 0.6;

        &.active {
            opacity: 1;
        }
    }

    .search-panel {
        background-color: #fff;
        position: fixed;
        z-index: 888;
        height: 50%;
        width: 100%;
        bottom: 0;
        display: flex;
        flex-direction: column;

        .input-wrap {
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 20px;
            margin-top: 10px;

            .label {
                width: 22px;
                height: 22px;
                flex-shrink: 0;
                margin-right: 20px;

                .icon {
                    width: 100%;
                    height: 100%;
                    fill: #666;
                }
            }

            .search-input {
                flex: 1;
                height: 60px;
                color: #333;
                font-size: 16px;
                padding: 0 20px;
                border: none;
                background-color: #eee;
                border-radius: 15px;
            }

            .btn-clear {
                width: 22px;
                text-align: center;
                color: #666;
                font-size: 16px;
            }
        }

        .address-list-wrap {
            box-sizing: border-box;
            flex: 1;
            overflow-x: hidden;
            overflow-y: auto;
            box-sizing: border-box;
            padding: 15px;

            .address-list {
                .address-item {
                    margin-bottom: 20px;
                    display: flex;

                    .left {
                        flex: 1;
                        .address-name {
                            font-size: 14px;
                            color: #333;
                            margin-bottom: 5px;
                        }

                        .address-detail {
                            font-size: 12px;
                            color: #666;
                            line-height: 19px;
                        }
                    }

                    .right {
                        width: 22px;
                        height: 100%;
                        margin-left: 10px;
                        display: flex;
                        align-items: center;

                        .selected {
                            .icon {
                                width: 22px;
                                height: 22px;
                                fill: #409eff;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
