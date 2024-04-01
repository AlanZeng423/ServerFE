<template>
    <div class="container">
      <div class="header">主服务器操作系统</div>
      <div class="main-content">
        <!-- <div class="network-structure">
        <div class="server-node">服务器 1</div>
        <div class="server-node">服务器 2</div>
        <div class="server-node">服务器 3</div>
        </div> -->
        <div ref="networkGraph" class="network-structure"></div>
        <div class="powershell-container">
          <div class="powershell">
            <div class="console" @keydown.enter="executeCommand" @keydown.up="previousCommand" @keydown.down="nextCommand">
              <div v-for="(line, index) in history" :key="index" class="line">
                <span class="prompt">{{ prompt }}</span>
                <span class="output">{{ line }}</span>
              </div>
              <div class="line input-line">
                <span class="prompt">{{ prompt }}</span>
                <input type="text" v-model="currentCommand" ref="commandInput" class="command-input" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import serverImage from '../assets/server.png';
import mainServerImage from '../assets/mainServer.png';
export default {
    name: 'MainServerOS',
    data() {
      return {
          currentCommand: '',
          history: [],
          prompt: 'PS C:\\Users\\User>',
          commandIndex: -1,
          serverImage,
          mainServerImage,
      };
    },
    methods: {
      initNetworkGraph() {
        const chart = echarts.init(this.$refs.networkGraph);
        const option = {
          series: [
            {
              type: 'graph',
              layout: 'none',
              symbolSize: [50, 50],
              
              roam: true,
              nodes: [
                { name: '主服务器', x: 300, y: 500, symbol: 'image://' + this.mainServerImage, symbolSize: [100,100]},  // 调整 y 坐标使主服务器在最下方
                { name: '服务器 1', x: 100, y: 300, symbol: 'image://' + this.serverImage, symbolSize: [50, 50]},
                { name: '服务器 2', x: 300, y: 300, symbol: 'image://' + this.serverImage, symbolSize: [50, 50]},
                { name: '服务器 3', x: 500, y: 300, symbol: 'image://' + this.serverImage, symbolSize: [50, 50]},
                { name: '服务器 4', x: 200, y: 200, symbol: 'image://' + this.serverImage, symbolSize: [50, 50]},
                { name: '服务器 5', x: 400, y: 200, symbol: 'image://' + this.serverImage, symbolSize: [50, 50]},
              ],
              edges: [
                { source: '主服务器', target: '服务器 1' },
                { source: '主服务器', target: '服务器 2' },
                { source: '主服务器', target: '服务器 3' },
                { source: '主服务器', target: '服务器 4' },
                { source: '主服务器', target: '服务器 5' },
              ],
            },
          ],
        };
        chart.setOption(option);
      },

        
      executeCommand(event) {
          if (this.currentCommand.trim() !== '') {
          this.history.push(this.currentCommand);
          this.commandIndex = this.history.length;
          this.history.push('Executed: ' + this.currentCommand);
          this.currentCommand = '';
          }
          this.$nextTick(() => {
          event.target.scrollIntoView(false);
          });
      },
      previousCommand() {
          if (this.commandIndex > 0) {
          this.commandIndex--;
          this.currentCommand = this.history[this.commandIndex];
          }
      },
      nextCommand() {
          if (this.commandIndex < this.history.length - 1) {
          this.commandIndex++;
          this.currentCommand = this.history[this.commandIndex];
          } else {
          this.commandIndex = this.history.length;
          this.currentCommand = '';
          }
      },
    },
    mounted() {
      this.initNetworkGraph();
      this.$refs.commandInput.focus();
    },
}
</script>

<style scoped>
.container {
    font-family: 'Consolas', 'Courier New', monospace;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #011627; /* Set the overall background color here */
}

.header {
    background-color: #012456;
    color: #ffffff;
    padding: 10px 20px;
    font-size: 24px;
    text-align: center;
}

.main-content {
    display: flex;
    flex-grow: 1;
    align-content: center;
    justify-content: space-between;
    padding: 0 20px;
}

.network-structure {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-right: 50px;
}

.server-node {
    background-color: #f0f0f0;
    color: #333;
    padding: 10px;
    border-radius: 5px;
}

.powershell-container {
    width: 800px;
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 50px;
}

.powershell {
    background-color: #012456;
    color: #ffffff;
    font-family: 'Consolas', 'Courier New', monospace;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    height: 600px;
    overflow: hidden;
}

.console {
    display: flex;
    flex-direction: column;
    height: calc(100% - 20px);
    overflow-y: auto;
}

.line {
    display: flex;
    white-space: nowrap;
}

.input-line {
    align-items: center;
}

.prompt {
    color: #4D9FEC;
}

.output {
    flex-grow: 1;
}

.command-input {
    background: none;
    color: inherit;
    border: none;
    outline: none;
    flex-grow: 1;
    font-family: 'Consolas', 'Courier New', monospace;
}
</style>
