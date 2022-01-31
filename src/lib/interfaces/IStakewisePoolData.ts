export interface IStakewisePoolData {
    contract_address:       StakewiseUniswapContract,
    current_tick:           number;
    current_tick_liquidity: string;
    full_range_liquidity:   string;
}

export enum StakewiseUniswapContract {
	SWISE_USDC = "0x477BFaef649B4cef1FBA91caCCB48080d6c9CA28",
	ETH_SETH2 = "0x7379e81228514a1D2a6Cf7559203998E20598346",
	SWISE_SETH2 = "0x992f534fcc87864875224d142d6Bf054B1882160",
	RETH2_SETH2= "0xa9ffb27d36901F87f1D0F20773f7072e38C5bfbA",
}
