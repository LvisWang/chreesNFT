// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract ChressPals is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address owner; // 最高权限地址

    /*
     * Mint 配置项
     * 最大5个
     * 最小1个
     * 0.0088 ether/个
     */
    uint MintMaxCount = 5;
    uint MintMinCount = 1;
    uint MintCost = 0.0088 ether;

    bytes32 public root; // 白名单，MerkleProof校验hash

    bool IsMintting = true; // 是否开启mint

    constructor(bytes32 _root) ERC721("ChressPalss", "CPP") {
        owner = msg.sender;
        _tokenIds.increment(); // tokenid从1起
        root = _root; //部署时候传入root
    }

    // NFT mint
    function mint(address player) private returns (uint256) {
        require(IsMintting, "Stop Mint!");
        uint256 newItemId = _tokenIds.current();
        string memory tokenURI = getTokenURI(newItemId);

        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _tokenIds.increment();
        return newItemId;
    }

    /*
     * 常规用户mint
     * 1.一次可以mint 1~5 个
     * 2.一个NFT支付0.0088 ether
     */
    function mintGuset(address player, uint times) public payable {
        // require(msg.value >= MintCost * times,"ehter not enough!");
        require(times <= MintMaxCount && times >= MintMinCount);
        for (uint key = 0; key < times; key++) {
            mint(player);
        }
    }

    /*
     * 白名单用户mint
     * 仅可mint 1个
     */
    function mintWhiteLists(address player, bytes32[] memory proof) public {
        require(isWhiteLists(proof, keccak256(abi.encodePacked(player))));
        mint(player);
    }

    // 切换mint状态
    function checkoutMintState(bool state) public {
        IsMintting = state;
    }

    /*
     * 配置白名单
     * markleTree root hash
     */
    function setMarkleTreeRoot(bytes32 _root) public {
        root = _root;
    }

    // 校验方法，传入两个数据，proof = 证明数据、lear = 地址
    function isWhiteLists(bytes32[] memory proof, bytes32 leaf)
        private
        view
        returns (bool)
    {
        return MerkleProof.verify(proof, root, leaf);
    }

    // 合约URI
    function contractURI() public view returns (string memory) {
        return
            "https://raw.githubusercontent.com/CheersPals/cheerspalsofficial/main/json/collection.json";
    }

    // 获取tokenURI
    function getTokenURI(uint256 index) private view returns (string memory) {
        uint256 randomIndex = index;
        string memory randomIndexString = Strings.toString(randomIndex);
        string
            memory headerString = "https://raw.githubusercontent.com/CheersPals/cheerspalsofficial/main/json/";
        string memory footerString = ".json";
        string memory tokenURI = string.concat(
            headerString,
            randomIndexString,
            footerString
        );
        return tokenURI;
    }

    // 合约ether提现
    function withdraw() public payable {
        require(msg.sender == owner, "not owner");
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success);
    }
}