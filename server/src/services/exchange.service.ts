import { TickerDto } from './../../../common/dtos/ticker.model';
import { BitfinexWrapper } from './exchangewrappers/exchanges/bitfinex.wrapper';
import { BittrexWrapper } from './exchangewrappers/exchanges/bittrex.wrapper';
import { PoloniexWrapper } from './exchangewrappers/exchanges/poloniex.wrapper';
import { KrakenWrapper } from './exchangewrappers/exchanges/kraken.wrapper';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';
import { Component, Get, Req } from '@nestjs/common';
import { RxHttpRequest } from 'rx-http-request';
import { Exchange } from '../../../common/enums/exchange.enum';
import { HistoryPeriod } from '../../../common/enums/period.enum';

@Component()
export class ExchangeService {

    constructor(
        private poloniexWrapper: PoloniexWrapper,
        private krakenWrapper: KrakenWrapper,
        private bittrexWrapper: BittrexWrapper,
        private bitfinexWrapper: BitfinexWrapper
    ) { }

    getTicker(exchange: Exchange): Observable<any[]> {
        switch (exchange) {
            case Exchange.poloniex:
                return this.poloniexWrapper.getTicker();
            case Exchange.kraken:
                return this.krakenWrapper.getTicker();
            case Exchange.bittrex:
                return this.bittrexWrapper.getTicker();
            case Exchange.bitfinex:
                return this.bitfinexWrapper.getTicker();
            default:
                return Observable.of([`${exchange} not yet implemented`]);
        }
    }

    getOhlc(params: { exchange: Exchange, base: string, quote: string, period: HistoryPeriod, limit: number }) {
        switch (params.exchange) {
            case Exchange.poloniex:
                return this.poloniexWrapper.getOhlc(params);
            case Exchange.kraken:
                return this.krakenWrapper.getOhlc(params);
            case Exchange.bittrex:
                return this.bittrexWrapper.getOhlc(params);
            case Exchange.bitfinex:
                return this.bitfinexWrapper.getOhlc(params);
            default:
                return Observable.of([`${params.exchange} not yet implemented`]);
        }
    }
}