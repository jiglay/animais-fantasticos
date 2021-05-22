export default class Funcionamento {
  constructor(funcionamento, activeClass) {
    this.funcionamento = document.querySelector(funcionamento);
    this.activeClass = activeClass;
  }

  dadosFuncionamento() {
    this.diasSemana = this.funcionamento.dataset.semana.split(',').map(Number);
    this.horarioSemana = this.funcionamento.dataset.horario.split(',').map(Number);
  }

  dadosAgora() {
    this.dataAgora = new Date();
    this.diaAgora = this.dataAgora.getDay();
    // horário de Brasília em relação a UTC
    this.horarioAgora = this.dataAgora.getUTCHours() - 3;
  }

  estaAberto() {
    const semanaAberto = this.diasSemana.indexOf(this.diaAgora) !== -1;

    // compara o horário atual com o horário que abre
    const horaAbre = this.horarioAgora >= this.horarioSemana[0];
    // compara o horário atual com o horário que fecha
    const horaFecha = this.horarioAgora < this.horarioSemana[1];
    const horarioAberto = (horaAbre && horaFecha);

    return semanaAberto && horarioAberto;
  }
  
  ativaAberto() {
    if (this.estaAberto()) this.funcionamento.classList.add(this.activeClass);
  }

  init() {
    if (this.funcionamento) {
      this.dadosFuncionamento();
      this.dadosAgora();
      this.ativaAberto();
    }
    
    return this;
  }
}
