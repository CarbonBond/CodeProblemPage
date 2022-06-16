#include <iostream>
#include <unordered_map>
#include <stdio.h>
#include <emscripten.h>


extern "C" {

EMSCRIPTEN_KEEPALIVE
bool containsDuplicate(int arraySize, int nums[]){


  if (arraySize == 0 ) { return false;}
  std::unordered_map<int, bool> numOfNums;

  for(int i = 0; i < arraySize; i++) {
    if (numOfNums[nums[i]]) return true;
    numOfNums[nums[i]] = true;
  }
  return false;
}

}
