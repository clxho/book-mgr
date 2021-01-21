<template>
  <div>
    <a-card>
      <!-- 标题 -->
      <h2>图书列表</h2>
      <a-divider />
      <!-- 搜索区 -->
      <space-between>
        <div class="search">
          <a-input-search
            v-model:value="keyword"
            placeholder="搜索书名"
            @search="searchBook"
            enter-button
          />
          <!-- 返回 -->
          <a href="javascript:;" v-if="backisShow" @click="back">返回</a>
        </div>
        <a-button @click="show = true">添加一条</a-button>
      </space-between>
      <a-divider />
      <!-- 表格 -->
      <a-table :columns="columns" :data-source="list" :pagination="false">   
        <!-- 删除与编辑模版 -->
        <template #actions="data">
          <a href="javascript:;" @click="update(data)">编辑</a>
          <a href="javascript:;" @click="removeBook(data.text)">删除</a>
        </template>
        <!-- 入库与出库模版 -->
           <template #count="data">
             <a href="javascript:;" @click="updateCount('IN_COUNT', data.record)">入库</a>
             {{data.text.count}}
             <a href="javascript:;" @click="updateCount('OUT_COUNT', data.record)">出库</a>
        </template>
      </a-table>
      <!-- 分页 -->
      <space-between>
        <div></div>
        <a-pagination
          v-model:current="curPage"
          :total="total"
          :page-size="5"
          @change="setPage"
        />
      </space-between>
    </a-card>
    <!-- 添加书籍弹框 -->
    <add-one v-model:show="show" />
    <!-- 编辑书籍弹框 -->
    <update v-model:show="showUpdateModal" :book= "curEditBook" />
  </div>
</template>

<script src="./index.jsx"></script>

<style lang="scss">
@import "./index.scss";
</style>