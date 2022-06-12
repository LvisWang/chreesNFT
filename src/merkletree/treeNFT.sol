// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
// openzeppelin 提供的校验工具
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleTreeWhiteList is ERC721, Ownable {
    using Counters for Counters.Counter;

    // 保存 MerkleProof 生成的白名单
    bytes32 public root;

    Counters.Counter private _tokenIdCounter;

    constructor(bytes32 _root) ERC721("MerkleTreeWhiteList", "MTWL") {
        // deploy 时候传入 Merkle Root
        root = _root;
    }
    
    // 校验方法，传入两个数据，proof = 证明数据、lear = 地址
    // 注意：严禁直接调用
    function isValid(bytes32[] memory proof, bytes32 leaf) private view returns (bool) {
        return MerkleProof.verify(proof, root, leaf);
    }
    
    function safeMint(address to, bytes32[] memory proof) public onlyOwner {
      // 校验 msg.sender 是否在白名单
        require(isValid(proof, keccak256(abi.encodePacked(to))), "Not a part of Allowlist");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function setRoot(bytes32 _root) public onlyOwner {
        root = _root;
    }

}